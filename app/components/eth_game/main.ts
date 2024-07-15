import { EthGame } from './scenes/EthGame';
import { AUTO, Game, Types } from "phaser";
import { StartScene } from './scenes/StartScene';

export const GAME_WIDTH = 1000;
export const GAME_HEIGHT = 700;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    title: "Crypto Knight",
    url: "https://bruh.gamez.io",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: true,
    parent: 'game-container',
    scale: {
        zoom: 1.1
    },
    scene: [
        StartScene,
        EthGame
    ],
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
    if (typeof window !== 'undefined') {  // Ensure window is defined
        return new Game({ ...config, parent });
    }
    return null;

}

export default StartGame;
