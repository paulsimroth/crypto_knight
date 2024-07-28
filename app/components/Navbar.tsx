import Connector from "./Connector";
import NetworkSwitch from "./NetworkSwitch";
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {

    return (
        <div className="w-full min-h-28 h-fit sticky top-0 flex items-center justify-between bg-secondary px-8 md:px-10 py-5">
            <h1 className="text-3xl font-bold max-w-2/3">
                Crypto Knight
            </h1>
            <div className="w-fit max-w-1/3 flex flex-col md:flex-row items-end md:items-center justfiy-center gap-5">
                <ThemeToggle />
                <NetworkSwitch />
                <Connector />
            </div>
        </div>
    )
};

export default Navbar;