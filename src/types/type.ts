export type IPortfolioDetails = {
    name: string;
    headline: string;
    logo: {
        url: string;
    }
    contact: {
        email: string;
        linkedin: string;
    }
    about: {
        description: string;
        ["description-short"]: string;
    },
    current_study: string[];
    work_experience: {
        title: string;
        from: string;
        to: string;
    }[];
    projects: {
        title: string;
        description: string;
        url: string;
    }[];
    resume: string;
}


export type IChat = {
    from: "user" | "agent";
    message: string;
    timestamp: string;
}

export type ICurrentChatContext = {
    isFetching: boolean;
    isTyping: boolean;
    text: string;
}