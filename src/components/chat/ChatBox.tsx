import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppStore } from "@/store/store";
import { AnimatePresence, motion } from "motion/react";
import Markdown from "react-markdown";
import { IChat } from "@/types/type";

type IProps = {
    chat: IChat;
    isLast: boolean;
};

export const ChatBox = (props: IProps) => {
    const { portfolio, userId, currentChat } = useAppStore();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(props.isLast && currentChat.isTyping === false) {
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end'
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isLast, ref])

    if (props.chat.from === "agent") {
        return (
            <motion.div className="font-mono flex flex-col"
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
            transition={{
                duration: 1,
            }}
            
            >
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
                            y: -100,
                            height: 0
                        }}
                        animate={{
                            opacity: 0.9,
                            y: 0,
                            height: '100%'
                        }}
                        exit={{
                            opacity: 0,
                            y: 20
                        }}
                        transition={{
                            duration: 1,
                        }}
                        className="p-2 pt-4 [&_ul]:list-disc [&_li]:ml-4 [&_li]:mt-2 text-xs md:text-sm border-b-2 pb-8"
                    >
                        <Markdown>{`${props.chat.message}`}</Markdown>
                    </motion.div>
                </AnimatePresence>
                <div ref={ref} />
            </motion.div>
        );
    }
    
    return (
        <motion.div className="font-mono flex flex-col justify-end"
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
        >
        <div className="flex items-center gap-4 justify-end">
            <div className="font-medium">Anonymous User</div>
            <Avatar>
                <AvatarImage src={`https://avatar.iran.liara.run/public?username=${userId}`} />
                <AvatarFallback>
                    US
                </AvatarFallback>
            </Avatar>
        </div>
        <AnimatePresence initial={false}
        
        >

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
                className="p-2 pt-4 [&_ul]:list-disc [&_li]:ml-4 [&_li]:mt-2 text-sm border-b-2 pb-8 text-end"
            >
                
                <Markdown>{`${props.chat.message}`}</Markdown>
            </motion.div>
        </AnimatePresence>  
        <div ref={ref} />
    </motion.div>

    )
};
