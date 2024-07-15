import Connector from "./Connector";

function Navbar() {

    return (
        <div className="w-full h-28 sticky top-0 flex items-center justify-between bg-secondary px-10">
            <h1 className="text-3xl font-bold">
                Crypto Knight
            </h1>
            <Connector />
        </div>
    )
};

export default Navbar;