import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GlowingEffect } from "../ui/glowing-effect";
import { IPortfolioDetails } from "@/types/type";
import { Separator } from "../ui/separator";
import clsx from "clsx";

type IProps = {
    data: IPortfolioDetails;
};

export const UserCard = ({ data }: IProps) => {

    const [showSectionOne, setShowSectionOne] = React.useState(true);
    const [showSectionTwo, setShowSectionTwo] = React.useState(false);

    
    return (
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
                    <AnimatePresence
                        onExitComplete={() => {
                            setShowSectionTwo(true);
                        }}
                    >
                        {showSectionOne && <motion.div className="relative flex flex-1 flex-col md:flex-row md:justify-between font-mono gap-2 md:gap-0"
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
                            <div className="md:w-1/3 flex flex-col items-center md:items-start
                                md:border-r md:mr-4 md:pr-3
                            ">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage
                                        src={data.logo.url}
                                        alt="Profile"
                                    />
                                </Avatar>
                                <h1 className="text-lg md:text-2xl font-bold font-mono">
                                    {data.name}
                                </h1>
                                <p className="text-sm md:text-base text-gray-600 text-center md:text-left mt-1 mb-4">
                                    {data.headline}
                                </p>
                                <section className="hidden md:block">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Currently Studying
                                    </h2>
                                    <div className="flex flex-col flex-wrap gap-1">
                                        <span className="font-medium">
                                            Imperial College Business School                                        
                                        </span>
                                        <span className="text-sm text-gray-200">
                                            Msc Strategic Marketing
                                        </span>
                                        <span className="text-gray-600">
                                            2020-2021
                                        </span>
                                    </div>
                                </section>

                                <div className="mt-auto w-full flex flex-col justify-center items-center md:justify-baseline md:items-start">
                                    <h2 className="text-lg font-semibold mb-2">
                                        Contact
                                    </h2>
                                    <div className="space-y-1 text-xs md:text-sm flex flex-col gap-2 justify-center items-center md:items-start md:justify-baseline">
                                        <p
                                            onClick={() => {
                                                window.open(
                                                    `mailto:${data.contact.email}`,
                                                    "_blank"
                                                );
                                            }}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> {data.contact.email}
                                        </p>
                                        <p
                                            onClick={() => {
                                                window.open(
                                                    `https://www.linkedin.com/in/${data.contact.linkedin}`,
                                                    "_blank"
                                                );
                                            }}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> {data.contact.linkedin}
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Right column with details */}
                            <div className="md:w-2/3">
                                <section className="mb-4 hidden md:flex flex-col gap-2 md:justify-between justify-center items-center md:items-start">
                                    <h2 className="text-lg font-semibold md:mb-2">
                                        About Me
                                    </h2>
                                    <p className="text-gray-600 text-sm hidden md:block">
                                        {data.about.description}
                                    </p>
                                    <p className="text-center text-gray-600 text-sm md:hidden block">
                                        {data.about["description-short"]}
                                    </p>
                                </section>

                                <div className="flex gap-4">
                                    <div className="hidden md:flex flex-col flex-1 gap-4">
                                        <section className="hidden md:block">
                                            <h2 className="text-lg font-semibold mb-2">
                                                Work Experience
                                            </h2>
                                            <Separator className="mb-2" />
                                            <ul className="space-y-1 text-sm flex flex-col gap-2">
                                                {data.work_experience.map(
                                                    (work, index) => (
                                                        <li key={index}>
                                                            <span className="font-medium">
                                                                {work.title}
                                                            </span>
                                                            <span className="text-gray-600">
                                                               {" "}- {work.from} to{" "}
                                                                {work.to}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                    </div>
                                    <div className="flex flex-col flex-1 w-full gap-2">
                                        <section className="hidden md:block">
                                            <h2 className="text-lg font-semibold mb-2">
                                                Projects
                                            </h2>
                                            <ul className="space-y-1 text-sm flex flex-col gap-2">
                                                {data.projects.map(
                                                    (project, index) => (
                                                        <div key={index}
                                                            className={clsx({
                                                                'cursor-pointer': project.url
                                                            })}

                                                            onClick={() => {
                                                                if (project.url) {
                                                                    window.open(
                                                                        project.url,
                                                                        "_blank"
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            <li >
                                                                <span className={clsx("font-medium mb-2", {
                                                                    'cursor-pointer underline underline-offset-3': project.url
                                                                })}> 
                                                                    {project.title}
                                                                </span>
                                                                {" "}-{" "}
                                                                <span className="text-gray-600">
                                                                    {
                                                                        project.description
                                                                    }
                                                                </span>
                                                            </li>

                                                            <Separator className="my-2"/>
                                                        </div>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                        <section className="mt-4 flex md:justify-end flex-col md:items-baseline items-center justify-center">
                                            <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-8 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 flex gap-2 items-center cursor-pointer"
                                            onClick={() => {
                                                window.open(
                                                    data.resume,
                                                    "_blank"
                                                );
                                            }}
                                            >
                                                Resume{" "}
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="mt-4 px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 md:hidden"
                                                onClick={() => {
                                                    setShowSectionOne(false);
                                                }}
                                            >
                                                Know More {">"}
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                    <AnimatePresence
                        onExitComplete={() => {
                            setShowSectionOne(true)
                        }}
                    >
                        {showSectionTwo &&
                            <motion.div
                                className="relative flex flex-1 flex-col md:flex-row md:justify-between font-mono gap-6 md:gap-0"
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
                                <section className="">
                                    <h2 className="text-base font-semibold mb-2">
                                        Currently Studying
                                    </h2>
                                    <div className="text-sm flex flex-col flex-wrap gap-1">
                                        <span className="font-medium">
                                            Imperial College Business School                                        
                                        </span>
                                        <span className="text-xs text-gray-200">
                                            Msc Strategic Marketing
                                        </span>
                                        <span className="text-gray-600">
                                            2020-2021
                                        </span>
                                    </div>
                                </section>
                                <section >
                                            <h2 className="text-base font-semibold mb-2">
                                                Work Experience
                                            </h2>
                                            <ul className="space-y-1 text-sm flex flex-col gap-2">
                                                {data.work_experience?.slice(0,1).map(
                                                    (work, index) => (
                                                        <li key={index}>
                                                            <span className="font-medium">
                                                                {work.title}
                                                            </span>
                                                            <span className="text-gray-600">
                                                                - {work.from} to{" "}
                                                                {work.to}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                        <section className="">
                                            <h2 className="text-base font-semibold mb-2">
                                                Projects
                                            </h2>
                                            <ul className="space-y-1 text-xs flex flex-col gap-2">
                                                {data.projects?.slice(0,1).map(
                                                    (project, index) => (
                                                        <div key={index}
                                                            className={clsx({
                                                                'cursor-pointer': project.url
                                                            })}

                                                            onClick={() => {
                                                                if (project.url) {
                                                                    window.open(
                                                                        project.url,
                                                                        "_blank"
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            <li >
                                                                <span className={clsx("font-medium mb-2", {
                                                                    'cursor-pointer underline underline-offset-3': project.url
                                                                })}> 
                                                                    {project.title}
                                                                </span>
                                                                {" "}-{" "}
                                                                <span className="text-gray-600">
                                                                    {
                                                                        project.description
                                                                    }
                                                                </span>
                                                            </li>

                                                        </div>
                                                    )
                                                )}
                                            </ul>
                                        </section>
                                        <button className="px-6 py-2 bg-transparent text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 md:hidden"
                                                onClick={() => {
                                                    setShowSectionTwo(false);
                                                }}
                                            >
                                                {"<"} Go Back
                                            </button>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
};
