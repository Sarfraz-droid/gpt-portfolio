import { IChat, ICurrentChatContext, IPortfolioDetails } from "@/types/type"
import { create } from "zustand"

export interface Store {
    portfolio: IPortfolioDetails
    chat: IChat[]
    currentChat: ICurrentChatContext
    userId: string

    setUserId: (userId?: string) => void
    updatePortfolio: (portfolio: IPortfolioDetails) => void
    setCurrentChat: (currentChat: ICurrentChatContext) => void
    addChat: (chat: IChat) => void
    clearChat: () => void
}

const avatars = ["Liam", "Zara", "Mateo", "Isla", "Jasper", "Aria", "Kai", "Nova", "Elio", "Freya"];

export const useAppStore = create<Store>((set => ({
    portfolio: {
        name: "",
        headline: "",
        logo: {
            url: ""
        },
        contact: {
            email: "",
            linkedin: ""
        },
        about: {
            description: "",
            "description-short": ""
        },
        current_study: [],
        work_experience: [],
        projects: [],
        resume: ""
    } as unknown as IPortfolioDetails,
    chat: [
        {
            from: "agent",
            message: `Hi there! Mushfiqah this side 😊
You\'re now chatting with an AI version of me. Feel free to ask anything about my resume—whether it\'s my work experience, education, skills, hobbies, or even fun facts!
Just a heads-up: this AI has a few prompt limits per minute to prevent overload, but you can ask questions like:

- What are your current studies?

- What kind of work have you done?

- What are your key skills?

- What's your visa status? `,
            timestamp: new Date().toISOString()
        }
    ] as IChat[],
    userId: '',
    currentChat: {
        isFetching: false,
        text: ""
    },
    setUserId: (userId?: string) => {
        set((state : Store) => ({
            ...state,
            userId: userId || avatars[Math.floor(Math.random() * avatars.length)]
        }))
    },
    setCurrentChat: (currentChat: ICurrentChatContext) => {
        set((state : Store) => ({
            ...state,
            currentChat
        }))
    },
    updatePortfolio: (portfolio: IPortfolioDetails) => { 
        set((state : Store) => ({
            ...state,
            portfolio: {
                ...state.portfolio,
                ...portfolio
            }
        }))
    },
    addChat: (chat: IChat) => {
        set((state : Store) => ({
            ...state,
            chat: [...state.chat, chat]
        }))
    },
    clearChat: () => {
        set((state : Store) => ({
            ...state,
            chat: []
        }))
    }
} as Store)));