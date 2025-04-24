"use client";
import React, { useEffect, useState } from "react";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { UserCard } from "../card/UserCard";
import { Chat } from "../chat/Chat";
import { IPortfolioDetails } from "@/types/type";
import { useAppStore } from "@/store/store";
import Image from "next/image";

type IProps = {
    data: IPortfolioDetails;
};

export const HomeUI = ({ data }: IProps) => {
    const [showChat, setShowChat] = useState(false);
    const [showChatUI, setShowChatUI] = useState(false);
    const { updatePortfolio, addChat, currentChat, userId, setCurrentChat } =
        useAppStore();

    useEffect(() => {
        updatePortfolio(data);
    }, [data, updatePortfolio]);

    const handleSubmitChat = async () => {
        try {
            addChat({
                from: "user",
                message: currentChat.text,
                timestamp: new Date().toISOString()
            });

            const text = currentChat.text;

            setCurrentChat({
                ...currentChat,
                isFetching: true,
            });

            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text
                })
            });

            const resData  = await response.json();

            setTimeout(() => {
                addChat({
                    from: "agent",
                    message: resData?.content || "No Response From the server. Please Try Agaiin",
                    timestamp: new Date().toISOString()
                })
            },0)

            setCurrentChat({
                text: "",
                isFetching: false,
                isTyping: false
            })

        } catch (err) {
            console.log(err)

            setCurrentChat({
                text: "",
                isFetching: false,
                isTyping: false
            })

            setTimeout(() => {  
                addChat({
                    from: "agent",
                    message: "Error Fetching Response from Server. Please try after some time",
                    timestamp: new Date().toISOString()
                })
            }, 0)
        }

    };

    return (
        <main className="max-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
            <div
                className={cn(
                    "opacity-20",
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

            <div className="w-full max-w-5xl mx-auto relative h-[100vh] flex flex-col md:py-24">
                <div className="h-[70vh] md:h-[80vh]">
                    <AnimatePresence
                        initial={false}
                        onExitComplete={() => {
                            setShowChatUI(true);
                        }}
                    >
                        {!showChat && (
                            <>
                                <UserCard data={data} />
                                <motion.div
                                    className="text-center text-gray-500 my-8"
                                    initial={{
                                        opacity: 0,
                                        y: -20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    transition={{
                                        duration: 1
                                    }}
                                >
                                    Chat with me by clicking the input below!
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    <AnimatePresence
                        initial={false}
                        onExitComplete={() => {
                            setShowChat(false);
                        }}
                    >
                        {showChatUI && (
                            <Chat
                                onBackClick={() => {
                                    setShowChatUI(false);
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    <motion.div
                        className="mt-2 md:mt-8 "
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: 20
                        }}
                        transition={{
                            duration: 1
                        }}
                    >
                        <PlaceholdersAndVanishInput
                            onClick={() => {
                                setShowChat(true);
                            }}
                            onChange={() => {}}
                            onSubmit={handleSubmitChat}
                            placeholders={["Ask AI about me"]}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <Image src={`https://avatar.iran.liara.run/public?username=${userId}`}
            className="hidden" alt={""}   width={0} height={0}         />
        </main>
    );
};
