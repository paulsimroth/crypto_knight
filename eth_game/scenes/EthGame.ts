import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
export class Game extends Scene {
    scoreText: any;
    private gridEngine!: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');

        //Images loaded
        this.load.image("knight", "knight.png");
        this.load.image("background", "background.png");
        this.load.image("crate", "crate.png");
        this.load.image("bitcoin", "bitcoin.png");

        //Load running animation frames
        this.load.image("knight_runFrame_1", "knight/run/Run (1).png");
        this.load.image("knight_runFrame_2", "knight/run/Run (2).png");
        this.load.image("knight_runFrame_3", "knight/run/Run (3).png");
        this.load.image("knight_runFrame_4", "knight/run/Run (4).png");
        this.load.image("knight_runFrame_5", "knight/run/Run (5).png");
        this.load.image("knight_runFrame_6", "knight/run/Run (6).png");
        this.load.image("knight_runFrame_7", "knight/run/Run (7).png");
        this.load.image("knight_runFrame_8", "knight/run/Run (8).png");
        this.load.image("knight_runFrame_9", "knight/run/Run (9).png");
        this.load.image("knight_runFrame_10", "knight/run/Run (10).png");

        //Load idle animation frames
        this.load.image("knight_idleFrame_1", "knight/idle/Idle (1).png");
        this.load.image("knight_idleFrame_2", "knight/idle/Idle (2).png");
        this.load.image("knight_idleFrame_3", "knight/idle/Idle (3).png");
        this.load.image("knight_idleFrame_4", "knight/idle/Idle (4).png");
        this.load.image("knight_idleFrame_5", "knight/idle/Idle (5).png");
        this.load.image("knight_idleFrame_6", "knight/idle/Idle (6).png");
        this.load.image("knight_idleFrame_7", "knight/idle/Idle (7).png");
        this.load.image("knight_idleFrame_8", "knight/idle/Idle (8).png");
        this.load.image("knight_idleFrame_9", "knight/idle/Idle (9).png");
        this.load.image("knight_idleFrame_10", "knight/idle/Idle (10).png");
    }

    create() {

        //Variables
        let cursors;
        let knight;
        let crates;
        let map;

        let coinTimer;
        let coins;



        let secondsLeft = 60;
        let timeLeftText;
        let timeLeftTimer;
        let gameOver = false;
        let coinsSent = false;

        //changed by pump talisman
        let COIN_GENERATION_INTERVALL = 4000;
        //changed by super boots
        let PLAYER_SPEED_VARIABLE = 200;
        //changed by time warp cape
        let GAME_SECONDS = 1000;

        //background
        map = this.add.image(500, 350, "background");

        //Knight created, hitbox size set, knight scaled
        knight = this.physics.add.sprite(100, 0, "knight");
        knight.body.setSize(400, 600);
        knight.scaleX = 0.15;
        knight.scaleY = 0.15;

        // Follow the knight around the scene
        //this.cameras.main.startFollow(knight, true);

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

        const platformPositions = [
            [200, 280],
            [300, 360],
            [490, 460],
            [570, 400],
            [710, 510],
            [790, 300],
            [870, 300],
            [900, 710],
        ];
        platformPositions.forEach((pos) => crates.create(pos[0], pos[1], 'crate'));

        //Score Text
        /*         scoreText = this.add.text(512, 490, 'Bitcoin Bag: 0', {
                    fontFamily: 'Arial Black', fontSize: 38, color: '#000',
                    stroke: '#000000', strokeThickness: 8,
                    align: 'center'
                }).setOrigin(0.5).setDepth(100);
        
                //Time Left Text
                timeLeftText = this.add.text(512, 490, secondsLeft + " Seconds left", {
                    fontFamily: 'Arial Black', fontSize: 38, color: '#000',
                    stroke: '#000000', strokeThickness: 8,
                    align: 'center'
                }).setOrigin(0.5).setDepth(100); */

        //Keyboard inputs
        /*         cursors = this.input.keyboard.createCursorKeys();
        
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
                }); */

        const gridEngineConfig = {
            characters: [
                {
                    id: "Knight",
                    sprite: knight,
                    startPosition: { x: 8, y: 8 }
                }
            ]
        }

        this.gridEngine.create(map, gridEngineConfig);
        this.gridEngine.movementStarted().subscribe(({ direction }: any) => {
            knight.anims.play(direction);
        })

        EventBus.emit('current-scene-ready', this);
    }

    update(): void {
        const cursors = this.input.keyboard!.createCursorKeys();
        const knight = this.gridEngine.characters[0];
        //changed by super boots
        let PLAYER_SPEED_VARIABLE = 200;

        if (cursors!.left.isDown) {
            knight.setVelocityX(-PLAYER_SPEED_VARIABLE);
            knight.play("knight_run", true);
            knight.flipX = true;
        }
        else if (cursors!.right.isDown) {
            knight.setVelocityX(PLAYER_SPEED_VARIABLE);
            knight.play("knight_run", true);
            knight.flipX = false;
        }
        else {
            knight.setVelocityX(0);
            knight.play("knight_idle", true)
        }

        if (cursors!.up.isDown && knight.body.touching.down) {
            knight.setVelocityY(-350);
        }

    }

    /*     physics() { }
    
        events() { }
    
        time() { } */
}
