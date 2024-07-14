import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import StartGame, { GAME_HEIGHT, GAME_WIDTH } from './main';
import { EventBus } from './EventBus';

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void
}

export const EthGameComponent = forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);
    const gameContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (game.current === null) {

            game.current = StartGame("game-container");

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: null });
            } else if (ref) {
                ref.current = { game: game.current, scene: null };
            }

        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                if (game.current !== null) {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() => {
        EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
            if (currentActiveScene && typeof currentActiveScene === 'function') {

                currentActiveScene(scene_instance);

            }

            if (typeof ref === 'function') {

                ref({ game: game.current, scene: scene_instance });

            } else if (ref) {

                ref.current = { game: game.current, scene: scene_instance };

            }

        });
        return () => {

            EventBus.removeListener('current-scene-ready');

        }
    }, [currentActiveScene, ref]);


    /*     useEffect(() => {
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
                parent: game.current,
                scene: [StartScene, Game],
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 500 },
                        debug: false
                    }
                }
            };
    
            const game = new Phaser.Game(config);
    
            return () => {
                game.destroy(true);
            };
        }, []); */

    return (
        <div id="game-container"></div>
    );

});
