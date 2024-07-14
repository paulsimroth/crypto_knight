import About from "./components/About";
import GameComponent from "./components/GameComponent";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-fit mx-auto">
            <GameComponent />
            <About />
        </div>
    );
};
