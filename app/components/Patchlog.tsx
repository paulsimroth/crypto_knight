import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import { Github } from "lucide-react";

const patchlogData = [
    {
        title: 'Release V1',
        description: 'First playable version with core web3 mechanics',
        date: new Date("2024-07-15"),
    },
    {
        title: 'Open Source Development',
        description: 'If the Github repo is already public, feel free to participate with your ideas in this little project!',
        date: new Date("2024-07-15"),
    },
    {
        title: 'Gameplay V1',
        description: 'Initial Gameplay',
        date: new Date("2024-07-15"),
    },
];

function Patchlog() {
    return (
        <div className="m-5 max-w-xl">
            <h2 className="text-2xl font-bold">Patchlog</h2>
            <p>
                Here you will find a list of all changes which happened to the gameplay or the smart contract archtitecture.
            </p>
            <Dialog>
                <DialogTrigger className="my-8">
                    <Button>Details</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="flex items-center justify-center">
                            <p>
                                Here you will find a list of all changes which happened to the gameplay or the smart contract archtitecture.
                            </p>
                            <Link href="https://github.com/paulsimroth/eth_game" target="_blank" aria-label='GitHub'>
                                <Github className='py-2 w-[44px] h-[44px] object-contain cursor-pointer hover:scale-150 duration-300 transition-transform mx-4' />
                            </Link>
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <PatchlogList items={patchlogData} />
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default Patchlog;

interface PatchlogData {
    title: string;
    description: string;
    date: Date;
}

interface PatchlogProps {
    items: PatchlogData[];
}

function PatchlogList({ items }: PatchlogProps) {
    return (
        <div className="p-4 max-h-[80vh] overflow-y-auto">
            {items.map((item, index) => (
                <PatchlogItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    isLast={index === items.length - 1}
                />
            ))}
        </div>
    );
};


interface PatchlogItemProps {
    title: string;
    description: string;
    date: Date;
    isLast?: boolean;
}

function PatchlogItem({ title, description, date, isLast = false }: PatchlogItemProps) {
    return (
        <div className="flex items-center mb-8">
            <div className="flex flex-col items-center mr-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                {!isLast && <div className="w-0.5 h-full bg-blue-300 mt-1" />}
            </div>
            <div className="flex-1 h-fit border-b border-secondary">
                <div className="flex items-center justify-start gap-8">
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <span className="text-xs text-gray-400">
                        {new Date(date).toLocaleDateString("en", {
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{description}</p>
            </div>
        </div>
    );
};