import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { GlowingEffect } from "../ui/glowing-effect";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { ChatBox } from "./ChatBox";
import { useAppStore } from "@/store/store";
import { ChatBoxLoader } from "./ChatBoxLoader";
import { isMobile } from "react-device-detect";

type IChat = {
  onBackClick: () => void;
  height: number;
  width: number;
};

export const Chat = (props: IChat) => {
  const { chat, currentChat } = useAppStore();

  return (
    <>
      <motion.div
        className="w-full flex-1 flex flex-col font-mono"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
        transition={{
          duration: 0.3,
        }}
        style={{
            height: isMobile ? `calc(100dvh - ${props.height + 48}px)` : '70dvh'
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
          <div className="border-0.75 relative flex h-full flex-col justify-between gap-0 md:gap-6 overflow-hidden rounded-xl px-2 md:p-6  bg-background">
            <div className="flex items-center mb-2 md:mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={props.onBackClick}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">Chat with Mushfiqah</h2>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden mb-4 space-y-4"
              id="chat-container"
            >
              <AnimatePresence>
                {chat.map((message, index) => (
                  <ChatBox
                    key={index}
                    chat={message}
                    isLast={index === chat.length - 1}
                  />
                ))}
                {currentChat.isFetching && <ChatBoxLoader />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
