import { Game as MainGame } from './scenes/EthGame';
import { AUTO, Game, Types } from "phaser";
import { PreLoader } from './scenes/PreLoader';
type Knight = Phaser.Physics.Arcade.Sprite;
type TimerEvent = Phaser.Time.TimerEvent;

//Variables
let cursors: any;
let knight: any;
let crates: any;

let coinTimer;
let coins;

let score = 0;
let scoreText: any;

let secondsLeft = 60;
let timeLeftText: any;
let timeLeftTimer;
let gameOver = false;
let coinsSent = false;

//changed by pump talisman
let COIN_GENERATION_INTERVALL = 4000;
//changed by super boots
let PLAYER_SPEED_VARIABLE = 200;
//changed by time warp cape
let GAME_SECONDS = 1000;

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 700;

let offScreenTimer: TimerEvent | null = null;
const OFF_SCREEN_TIMEOUT = 3000; // 3 seconds in milliseconds
let gameOverText: Phaser.GameObjects.Text | null = null;

function createGameOverText(scene: Phaser.Scene): void {
    gameOverText = scene.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'GAME OVER', {
        fontFamily: 'Arial',
        fontSize: '35px',
        color: '#ff0000',
        align: 'center'
    });
    gameOverText.setOrigin(0.5);
    gameOverText.setScrollFactor(0);
    gameOverText.setDepth(1000); // Ensure it's on top of other game objects
    gameOverText.setVisible(false);
};


function createStartButton(scene: Phaser.Scene, x: number, y: number, callback: () => void): Phaser.GameObjects.Text {
    const button = scene.add.text(x, y, 'Start Game', {
        font: '24px Arial',
        color: '#ffffff',
        backgroundColor: '#00ff00',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
    });

    button.setInteractive({ useHandCursor: true })
        .on('pointerover', () => button.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => button.setStyle({ fill: '#ffffff' }))
        .on('pointerdown', () => callback());

    return button;
}

//Loading assets
//GAME PRELOAD
function gamePreload(this: Phaser.Scene) {
    // Images loaded
    this.load.image("knight", "assets/knight.png");
    this.load.image("background", "assets/background.png");
    this.load.image("crate", "assets/crate.png");
    this.load.image("bitcoin", "assets/bitcoin.png");

    // Load running animation frames
    for (let i = 1; i <= 10; i++) {
        this.load.image(`knight_runFrame_${i}`, `assets/knight/run/Run (${i}).png`);
    }

    // Load idle animation frames
    for (let i = 1; i <= 10; i++) {
        this.load.image(`knight_idleFrame_${i}`, `assets/knight/idle/Idle (${i}).png`);
    }
};

//initial setup logic
//GAME CREATE
function gameCreate(this: Phaser.Scene) {
    //background
    this.add.image(500, 350, "background");

    // Add a title
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, 'Crypto Knight', {
        font: '48px Arial',
        color: '#000000'
    }).setOrigin(0.5);

    //Knight created, hitbox size set, knight scaled
    knight = this.physics.add.sprite(100, 100, "knight");
    knight.body.setSize(400, 600, 10, 0);
    knight.scaleX = 0.15;
    knight.scaleY = 0.15;

    //Floor created out of crates
    crates = this.physics.add.staticGroup();

    //Floor
    crates.create(40, 560, "crate");
    crates.create(120, 560, "crate");
    crates.create(200, 560, "crate");
    crates.create(280, 560, "crate");
    crates.create(360, 560, "crate");
    crates.create(440, 560, "crate");
    crates.create(790, 560, "crate");

    //Platforms
    crates.create(200, 280, "crate");
    crates.create(300, 360, "crate");
    crates.create(490, 460, "crate");
    crates.create(570, 400, "crate");
    crates.create(710, 510, "crate");
    crates.create(790, 300, "crate");

    //animations
    this.anims.create({
        key: "knight_run",
        frames: [
            { key: "knight_runFrame_1" },
            { key: "knight_runFrame_2" },
            { key: "knight_runFrame_3" },
            { key: "knight_runFrame_4" },
            { key: "knight_runFrame_5" },
            { key: "knight_runFrame_6" },
            { key: "knight_runFrame_7" },
            { key: "knight_runFrame_8" },
            { key: "knight_runFrame_9" },
            { key: "knight_runFrame_10" }
        ],
        frameRate: 10,
        repeat: 1
    });

    this.anims.create({
        key: "knight_idle",
        frames: [
            { key: "knight_idleFrame_1" },
            { key: "knight_idleFrame_2" },
            { key: "knight_idleFrame_3" },
            { key: "knight_idleFrame_4" },
            { key: "knight_idleFrame_5" },
            { key: "knight_idleFrame_6" },
            { key: "knight_idleFrame_7" },
            { key: "knight_idleFrame_8" },
            { key: "knight_idleFrame_9" },
            { key: "knight_idleFrame_10" }
        ],
        frameRate: 10,
        repeat: 1
    });

    //Collider set for knight and floor
    this.physics.add.collider(crates, knight);

    //Score Text
    scoreText = this.add.text(6, 16, "Bitcoin Bag: 0", { fontSize: "32px", fill: "#000" });
    createGameOverText(this);

    //Time Left Text
    timeLeftText = this.add.text(6, 56, secondsLeft + " Seconds left", { fontSize: "30px", fill: "#000" });

    //Keyboard inputs
    cursors = this.input.keyboard!.createCursorKeys();

    //Timer for generating coins
    coinTimer = this.time.addEvent({
        delay: COIN_GENERATION_INTERVALL,
        callback: generateCoins,
        callbackScope: this,
        repeat: -1
    });

    //Timer for time left
    timeLeftTimer = this.time.addEvent({
        delay: GAME_SECONDS,
        callback: updateTimeLeft,
        callbackScope: this,
        repeat: -1
    });
};

async function updateTimeLeft(this: Phaser.Scene) {
    if (gameOver) {
        if (gameOverText) {
            gameOverText.setVisible(true);
        }
        if (!coinsSent) {
            coinsSent = true;
            /* await mintAfterGame(score); */
        };
        return;
    };

    secondsLeft -= 1;
    timeLeftText.setText(secondsLeft + " Seconds left");

    if (secondsLeft <= 0) {
        this.physics.pause();
        gameOver = true;
    }
};

//Generating Coins
function generateCoins(this: Phaser.Scene) {
    coins = this.physics.add.group({
        key: "bitcoin",
        repeat: 1,
        setXY: {
            x: Phaser.Math.Between(0, 900),
            y: -50,
            stepX: Phaser.Math.Between(30, 100)
        }
    });

    coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 1.5))
    });

    this.physics.add.collider(coins, crates);
    this.physics.add.overlap(knight, coins, collectCoin, null, this);

};

function collectCoin(knight: any, coin: any) {
    coin.disableBody(true, true);
    score++;
    scoreText.setText("Bitcoin Bag: " + score);
};

function checkKnightPosition(knight: Knight): void {
    const knightBounds = knight.getBounds();

    if (
        knightBounds.left > GAME_WIDTH ||
        knightBounds.right < 0 ||
        knightBounds.top > GAME_HEIGHT ||
        knightBounds.bottom < 0
    ) {
        // Knight is off-screen
        if (offScreenTimer === null) {
            offScreenTimer = knight.scene.time.delayedCall(OFF_SCREEN_TIMEOUT, () => {
                console.log("Game over: Knight was off-screen for too long!");
                knight.scene.scene.pause();

                if (gameOverText) {
                    gameOverText.setVisible(true);
                }
            }).getProgress();
        }
    } else {
        // Knight is on-screen
        if (offScreenTimer !== null) {
            knight.scene.time.removeEvent(offScreenTimer);
            offScreenTimer = null;
        }
    }
}

//Monitoring inputs and updating game
//GAME UPDATE
function gameUpdate() {
    if (cursors.left.isDown) {
        knight.setVelocityX(-PLAYER_SPEED_VARIABLE);
        knight.play("knight_run", true);
        knight.flipX = true;
    }
    else if (cursors.right.isDown) {
        knight.setVelocityX(PLAYER_SPEED_VARIABLE);
        knight.play("knight_run", true);
        knight.flipX = false;
    }
    else {
        knight.setVelocityX(0);
        knight.play("knight_idle", true)
    }

    if (cursors.up.isDown && knight.body.touching.down) {
        knight.setVelocityY(-350);
    }

    if (cursors.space.isDown && knight.body.touching.down) {
        knight.setVelocityY(-400);
    }

    // Check knight's position
    checkKnightPosition(knight);
};

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    title: "Crypto Knight",
    width: 1000,
    height: 700,
    pixelArt: true,
    parent: 'game-container',
    scale: {
        zoom: 1.1
    },
    scene: {
        preload: gamePreload,
        create: gameCreate,
        update: gameUpdate
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 720 }
        }
    },
    autoFocus: false,
    input: {
        keyboard: true
    }
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
