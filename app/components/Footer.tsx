import { Github } from "lucide-react";
import Link from "next/link";

function Footer() {
    return (
        <div className="w-full h-28 sticky bottom-0 flex items-center justify-between bg-secondary px-10">
            <Link href="https://github.com/paulsimroth" target="_blank" aria-label='GitHub'>
                <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
            </Link>
            <p>
                built by <Link href={"https://www.paulsimroth.at/"} className="underline" target="_blank">Paul Simroth</Link>
            </p>
            <div>
                <Link href={"https://www.paulsimroth.at/imprint"} className="underline m-2" target="_blank">
                    Imprint
                </Link>
                <Link href={"https://www.paulsimroth.at/datapolicy"} className="underline m-2" target="_blank">
                    Datapolicy
                </Link>
            </div>
        </div>
    )
};

export default Footer;