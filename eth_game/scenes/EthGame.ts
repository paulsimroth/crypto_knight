import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { GAME_HEIGHT, GAME_WIDTH } from 'eth_game/main';
import { mintAfterGame } from '@/lib/web3Service';

type Knight = Phaser.Physics.Arcade.Sprite;
type TimerEvent = Phaser.Time.TimerEvent;

const OFF_SCREEN_TIMEOUT = 3000; // 3 seconds in milliseconds

// Variables changed by special items
let COIN_GENERATION_INTERVAL = 4000;
let PLAYER_SPEED_VARIABLE = 200;
let GAME_SECONDS = 1000;

export class EthGame extends Scene {
    cursors: any;
    knight: Knight;
    crates: Phaser.Physics.Arcade.StaticGroup;
    coinTimer: TimerEvent;
    coins: Phaser.Physics.Arcade.Group;
    score: number = 0;
    scoreText: Phaser.GameObjects.Text;
    secondsLeft: number = 60;
    timeLeftText: Phaser.GameObjects.Text;
    timeLeftTimer: TimerEvent;
    gameOver: boolean = false;
    coinsSent: boolean = false;
    offScreenTimer: TimerEvent | null = null;
    gameOverText: Phaser.GameObjects.Text | null = null;

    constructor() {
        super({ key: 'EthGame' });
    }

    preload() {
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
    }

    create() {
        // Background
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "background");

        // Create knight
        this.knight = this.physics.add.sprite(100, 100, "knight");
        if (this.knight.body) {
            this.knight.body.setSize(400, 600);
        }
        this.knight.scaleX = 0.15;
        this.knight.scaleY = 0.15;

        // Create floor and platforms
        this.crates = this.physics.add.staticGroup();
        const floorPositions = [40, 120, 200, 280, 360, 440, 790];
        floorPositions.forEach(pos => this.crates.create(pos, 560, "crate"));
        const platformPositions = [
            [200, 280],
            [300, 360],
            [490, 460],
            [570, 400],
            [710, 510],
            [790, 300],
        ];
        platformPositions.forEach(pos => this.crates.create(pos[0], pos[1], "crate"));

        // Animations
        this.anims.create({
            key: "knight_run",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `knight_runFrame_${i + 1}` })),
            frameRate: 10,
            repeat: 1
        });
        this.anims.create({
            key: "knight_idle",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `knight_idleFrame_${i + 1}` })),
            frameRate: 10,
            repeat: 1
        });

        // Collider
        this.physics.add.collider(this.crates, this.knight);

        // Score and Time Text
        this.scoreText = this.add.text(6, 16, "Bitcoin Bag: 0", { fontSize: "32px", color: "#000000" });
        this.createGameOverText();
        this.timeLeftText = this.add.text(6, 56, `${this.secondsLeft} Seconds left`, { fontSize: "30px", color: "#000000" });

        // Keyboard inputs
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Timers
        this.coinTimer = this.time.addEvent({
            delay: COIN_GENERATION_INTERVAL,
            callback: this.generateCoins,
            callbackScope: this,
            repeat: -1
        });
        this.timeLeftTimer = this.time.addEvent({
            delay: GAME_SECONDS,
            callback: this.updateTimeLeft,
            callbackScope: this,
            repeat: -1
        });

        EventBus.emit('current-scene-ready', this);
    }

    createGameOverText(): void {
        this.gameOverText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '35px',
            color: '#ff0000',
            align: 'center'
        });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.setScrollFactor(0);
        this.gameOverText.setDepth(1000); // Ensure it's on top of other game objects
        this.gameOverText.setVisible(false);
    }

    async updateTimeLeft() {
        if (this.gameOver) {
            if (this.gameOverText) {
                this.gameOverText.setVisible(true);
            }
            if (!this.coinsSent) {
                this.coinsSent = true;
                await mintAfterGame(this.score);
            }
            EventBus.emit('game_finished', this);
            return;
        }

        this.secondsLeft -= 1;
        this.timeLeftText.setText(`${this.secondsLeft} Seconds left`);

        if (this.secondsLeft <= 0) {
            this.physics.pause();
            this.gameOver = true;
        }
    }

    generateCoins() {
        this.coins = this.physics.add.group({
            key: "bitcoin",
            repeat: 1,
            setXY: {
                x: Phaser.Math.Between(0, 900),
                y: -50,
                stepX: Phaser.Math.Between(30, 100)
            }
        });

        this.coins.children.iterate((child: Phaser.GameObjects.GameObject) => {
            const coin = child as Phaser.Physics.Arcade.Sprite;
            coin.setBounceY(Phaser.Math.FloatBetween(0.3, 1.5));
            return false;
        });

        this.physics.add.collider(this.coins, this.crates);
        // @ts-ignore
        this.physics.add.overlap(this.knight, this.coins, this.collectCoin, null, this);
    }

    collectCoin(knight: Phaser.Physics.Arcade.Sprite, coin: Phaser.Physics.Arcade.Sprite) {
        coin.disableBody(true, true);
        this.score++;
        this.scoreText.setText("Bitcoin Bag: " + this.score);
    }

    checkKnightPosition(knight: Knight): void {
        const knightBounds = knight.getBounds();

        if (
            knightBounds.left > GAME_WIDTH ||
            knightBounds.right < 0 ||
            knightBounds.top > GAME_HEIGHT ||
            knightBounds.bottom < 0
        ) {
            // Knight is off-screen
            if (this.offScreenTimer === null) {
                this.offScreenTimer = this.time.delayedCall(OFF_SCREEN_TIMEOUT, () => {
                    console.log("Game over: Knight was off-screen for too long!");
                    this.scene.pause();

                    if (this.gameOverText) {
                        this.gameOverText.setVisible(true);
                    }
                });
            }
        } else {
            // Knight is on-screen
            if (this.offScreenTimer !== null) {
                this.time.removeEvent(this.offScreenTimer);
                this.offScreenTimer = null;
            }
        }
    }

    update() {
        if (this.cursors.left.isDown) {
            this.knight.setVelocityX(-PLAYER_SPEED_VARIABLE);
            this.knight.play("knight_run", true);
            this.knight.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.knight.setVelocityX(PLAYER_SPEED_VARIABLE);
            this.knight.play("knight_run", true);
            this.knight.flipX = false;
        }
        else {
            this.knight.setVelocityX(0);
            this.knight.play("knight_idle", true);
        }

        if (this.cursors.up.isDown && this.knight.body && this.knight.body.touching.down) {
            this.knight.setVelocityY(-400);
        }

        if (this.cursors.space.isDown && this.knight.body && this.knight.body.touching.down) {
            this.knight.setVelocityY(-400);
        }

        // Check knight's position
        this.checkKnightPosition(this.knight);
    }
};