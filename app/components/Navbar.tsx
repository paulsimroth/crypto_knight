import Connector from "./Connector";

function Navbar() {

    return (
        <div className="w-full h-28 flex items-center justify-between bg-pimary px-10">
            <h1>
                ETH Game
            </h1>
            <Connector />
        </div>
    )
}

export default Navbar;