import { Game as MainGame } from './scenes/EthGame';
import { AUTO, Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 1000,
    height: 700,
    parent: 'game-container',
    scene: [
        MainGame
    ],
    physics: {
        default: 'arcade'
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
