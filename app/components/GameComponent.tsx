'use client';
import { Suspense, useRef } from "react";
import { EthGame, IRefPhaserGame } from "../../eth_game/Game";
import { Button } from "./ui/button";
import Image from "next/image";

function GameComponent() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const addSprite = () => {

        if (phaserRef.current) {
            const scene = phaserRef.current.scene;

            if (scene) {
                // Add a new sprite to the current scene at a random position
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);

                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                scene.add.sprite(x, y, 'bitcoin');

            }
        }
    };

    return (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
            <Suspense fallback={<GameLoader />}>
                <div className="border-8 border-secondary rounded-md">
                    <EthGame ref={phaserRef} />
                </div>
            </Suspense>
            <div>
                <Button onClick={addSprite}>
                    Add New Sprite
                </Button>
            </div>
        </div>
    );
}

export default GameComponent;


function GameLoader() {
    return (
        <div className="w-[1000px] h-[700px] bg-secondary rounded-lg p-1">
            <Image
                src="/assets/background.png"
                width={1000}
                height={700}
                alt="Loader"
            />
        </div>
    )
}