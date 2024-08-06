import { Github } from "lucide-react";
import Link from "next/link";
import ContactForm from "./ContactForm";

function Footer() {
    return (
        <div className="w-full h-28  bottom-0 flex items-center justify-between bg-secondary px-10">
            <div className="flex items-center justify-center gap-3 w-fit">
                <Link href="https://github.com/paulsimroth/crypto_knight" target="_blank" aria-label='GitHub'>
                    <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
                </Link>
                <ContactForm />
            </div>
            <p className="text-center w-fit">
                built by <Link href={"https://www.paulsimroth.at/"} className="underline" target="_blank">Paul Simroth</Link>
            </p>
            <div className="flex flex-col md:flex-row items-start w-fit max-w-1/3">
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