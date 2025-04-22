"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Download, Send, ArrowLeft } from "lucide-react";
import { Badge } from "../ui/badge";
import { GlowingEffect } from "../ui/glowing-effect";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const HomeUI = () => {
    const [showChat, setShowChat] = useState(false);
    const [showChatUI, setShowChatUI] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "portfolio" }[]
    >([]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages([...messages, { text: inputValue, sender: "user" }]);
        setInputValue("");

        // Simulate portfolio response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    text: `Thanks for your message: "${inputValue}". I'll get back to you soon!`,
                    sender: "portfolio"
                }
            ]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
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

            <div className="w-full max-w-3xl mx-auto relative min-h-[80vh] flex flex-col">
                <div className="h-[80vh]">
                    <AnimatePresence
                        initial={false}
                        onExitComplete={() => {
                            setShowChatUI(true);
                        }}
                    >
                        {!showChat && (
                            <>
                            <motion.div
                                className="relative h-full md:h-auto rounded-2xl border p-2 md:rounded-3xl md:p-3"
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
                                <GlowingEffect
                                    blur={0}
                                    borderWidth={3}
                                    spread={80}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                />
                                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-background">
                                    <div className="relative flex flex-1 flex-col md:flex-row md:justify-between gap-3 font-mono">
                                        <div className="md:w-1/3 flex flex-col items-center md:items-start">
                                            <Avatar className="h-24 w-24 mb-4">
                                                <AvatarImage
                                                    src="/placeholder.svg?height=96&width=96"
                                                    alt="Profile"
                                                />
                                                <AvatarFallback>
                                                    JD
                                                </AvatarFallback>
                                            </Avatar>
                                            <h1 className="text-2xl font-bold font-mono">
                                                Jane Doe
                                            </h1>
                                            <p className="text-gray-600 text-center md:text-left mt-1 mb-4">
                                                Full Stack Developer | UI/UX
                                                Enthusiast
                                            </p>

                                            <div className="mt-auto w-full">
                                                <h2 className="text-lg font-semibold mb-2">
                                                    Contact
                                                </h2>
                                                <div className="space-y-1 text-sm">
                                                    <p>
                                                        📧 jane.doe@example.com
                                                    </p>
                                                    <p>
                                                        🔗
                                                        linkedin.com/in/janedoe
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right column with details */}
                                        <div className="md:w-2/3">
                                            <section className="mb-4">
                                                <h2 className="text-lg font-semibold mb-2">
                                                    About Me
                                                </h2>
                                                <p className="text-gray-600 text-sm">
                                                    Passionate developer with 5+
                                                    years of experience building
                                                    modern web applications.
                                                    Focused on creating
                                                    intuitive, accessible, and
                                                    performant user experiences.
                                                </p>
                                            </section>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <section>
                                                    <h2 className="text-lg font-semibold mb-2">
                                                        Currently Studying
                                                    </h2>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Badge variant="outline">
                                                            Machine Learning
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            WebAssembly
                                                        </Badge>
                                                        <Badge variant="outline">
                                                            Rust
                                                        </Badge>
                                                    </div>
                                                </section>

                                                <section className="hidden md:block">
                                                    <h2 className="text-lg font-semibold mb-2">
                                                        Projects
                                                    </h2>
                                                    <ul className="space-y-1 text-sm">
                                                        <li>
                                                            <span className="font-medium">
                                                                Portfolio Chat
                                                            </span>{" "}
                                                            - Interactive
                                                            portfolio
                                                        </li>
                                                        <li>
                                                            <span className="font-medium">
                                                                E-commerce
                                                                Platform
                                                            </span>{" "}
                                                            - Full-stack store
                                                        </li>
                                                        <li>
                                                            <span className="font-medium">
                                                                Task Manager
                                                            </span>{" "}
                                                            - Productivity app
                                                        </li>
                                                    </ul>
                                                </section>

                                                <section className="hidden md:block">
                                                    <h2 className="text-lg font-semibold mb-2">
                                                        Work Experience
                                                    </h2>
                                                    <ul className="space-y-1 text-sm">
                                                        <li>
                                                            <div className="font-medium">
                                                                Senior Developer
                                                                at TechCorp
                                                            </div>
                                                            <div className="text-gray-500">
                                                                2020 - Present
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="font-medium">
                                                                Web Developer at
                                                                StartupXYZ
                                                            </div>
                                                            <div className="text-gray-500">
                                                                2018 - 2020
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </section>
                                                <section className="flex justify-end flex-col items-baseline">
                                                    <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-8 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 flex gap-2 items-center">
                                                        Resume{" "}
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div className="text-center text-gray-500 my-8"
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
                    <AnimatePresence initial={false}
                        onExitComplete={() => {
                            setShowChat(false);
                        }}
                    >
                        {showChatUI && (
                            <motion.div
                                className="h-full w-full flex-1 flex flex-col"
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
                                                                
                                <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                                <GlowingEffect
                                    blur={0}
                                    borderWidth={3}
                                    spread={80}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                />
                                    <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6  bg-background">
                                        <div className="flex items-center mb-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setShowChatUI(false)
                                                }
                                                className="mr-2"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </Button>
                                            <h2 className="text-lg font-semibold">
                                                Chat with Jane
                                            </h2>
                                        </div>

                                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                                            {messages.length === 0 ? (
                                                <div className="text-center text-gray-500 my-8">
                                                    Send a message to start the
                                                    conversation
                                                </div>
                                            ) : (
                                                messages.map(
                                                    (message, index) => (
                                                        <div
                                                            key={index}
                                                            className={`flex ${
                                                                message.sender ===
                                                                "user"
                                                                    ? "justify-end"
                                                                    : "justify-start"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`max-w-[80%] p-3 rounded-lg ${
                                                                    message.sender ===
                                                                    "user"
                                                                        ? "bg-blue-500 text-white rounded-br-none"
                                                                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                                                                }`}
                                                            >
                                                                {message.text}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    <motion.div
                        className="mt-2 md:mt-8"
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
                            onSubmit={() => {}}
                            placeholders={["Ask AI about me"]}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
};
