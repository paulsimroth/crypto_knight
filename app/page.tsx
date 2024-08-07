import About from "./components/About";
import GameComponent from "./components/GameComponent";
import Patchlog from "./components/Patchlog";
import Roadmap from "./components/Roadmap";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full mx-auto">
            <GameComponent />
            <About />
            <div className="flex items-center justify-evenly w-full h-fit my-5 mb-8">
                <Patchlog />
                <Roadmap />
            </div>
        </div>
    );
};
