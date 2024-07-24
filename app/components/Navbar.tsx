import Connector from "./Connector";
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {

    return (
        <div className="w-full h-28 sticky top-0 flex items-center justify-between bg-secondary px-10">
            <h1 className="text-3xl font-bold">
                Crypto Knight
            </h1>
            <div className="w-fit flex itmes-center justfiy-center gap-5">
                <ThemeToggle />
                <Connector />
            </div>
        </div>
    )
};

export default Navbar;