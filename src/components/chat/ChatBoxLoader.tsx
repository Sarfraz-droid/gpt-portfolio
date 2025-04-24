import React, { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAppStore } from "@/store/store";
import { AnimatePresence, motion } from "motion/react";

export const ChatBoxLoader = () => {
    const { portfolio } = useAppStore();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        })
    }, [ref])

    return (
        <div className="font-mono flex flex-col" ref={ref}>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={portfolio.logo.url} />
                </Avatar>
                <div className="font-medium">Mushfiqah Alam</div>
            </div>
            <AnimatePresence initial={false}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 0.9,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        y: 20
                    }}
                    className="p-2 pt-4 [&_ul]:list-disc [&_li]:ml-4 [&_li]:mt-2 text-sm border-b-2 pb-8"
                >
                    <DotLottieReact
                        src="https://lottie.host/26295cd1-8f2f-495a-b5a1-bae1f309271d/VroFfkwyhu.lottie"
                        loop
                        autoplay
                        className="w-10 ml-8"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
