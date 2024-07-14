import { GAME_HEIGHT, GAME_WIDTH } from 'eth_game/main';
import { Scene } from 'phaser';

export class StartScene extends Scene {
    scoreText: any;

    constructor() {
        super('StartScene');
    }

    preload() {
        this.load.setPath('assets');

        //Images loaded
        this.load.image("knight", "knight.png");
        this.load.image("background", "background.png");
    }

    create() {

        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background');

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 3, 'Crypto Knight', {
            font: '48px Arial',
            color: '#000000'
        }).setOrigin(0.5);

        const startButton = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Start Game', {
            font: '32px Arial',
            color: '#FFFFFF',
            backgroundColor: '#0000FF',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('EthGame');
        });
    }
}