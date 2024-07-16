import About from "./components/About";
import GameComponent from "./components/GameComponent";
import Patchlog from "./components/Patchlog";
import Roadmap from "./components/Roadmap";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-fit mx-auto">
            <GameComponent />
            <About />
            <div className="flex items-center justify-evenly w-full h-[100px]">
                <Patchlog />
                <Roadmap />
            </div>
        </div>
    );
};
