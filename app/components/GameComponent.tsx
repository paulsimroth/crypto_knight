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
        <>
            <div className="w-full h-fit mt-8 hidden lg:flex flex-col items-center justify-center">
                <Suspense fallback={<GameLoader />}>
                    <div className="border-8 border-secondary rounded-md">
                        <EthGameComponent ref={phaserRef} />
                    </div>
                </Suspense>
            </div>
            <div className="w-[80%] max-w-[1000px] h-fit min-h-[300px] lg:hidden flex flex-col items-center justify-center text-justify">
                <h2 className="text-left w-full text-2xl font-bold my-2">
                    Thank you for visiting Crypto Knights!
                </h2>
                <p>
                    Please visit this page on Desktop. Currently there is no mobile version of this game available.
                </p>
                <p>
                    You need a keyboard to play this game. Touch controls are in progress.
                </p>
            </div>
        </>
    );
}

export default GameComponent;


function GameLoader() {
    return (
        <div className="w-[1000px] h-[600px] bg-secondary rounded-lg p-1">
            <Image
                src="/assets/background.png"
                width={1000}
                height={700}
                alt="Loader"
            />
        </div>
    )
}