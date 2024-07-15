'use client';
import { Suspense, useRef } from "react";
import Image from "next/image";
import { IRefPhaserGame } from "./eth_game/Game";
import dynamic from "next/dynamic";

const EthGameComponent = dynamic(() => import('./eth_game/Game').then((mod) => mod.EthGameComponent), {
    ssr: false,
});

function GameComponent() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
            <Suspense fallback={<GameLoader />}>
                <div className="border-8 border-secondary rounded-md mt-[10lvh]">
                    <EthGameComponent ref={phaserRef} />
                </div>
            </Suspense>
            <div>
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