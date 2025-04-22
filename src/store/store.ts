import { UserDetails, UserType } from "@/types/type"
import { FirebaseApp } from "firebase/app"
import { create } from "zustand"

interface Store {
    user: UserDetails
    updateUser: (user: UserDetails) => void
}

const useStore = create<Store>((set) => ({
    user: {
        userType: UserType.NONE
    },
    updateUser: (user: UserDetails) => set({ user })
}))

interface FirebaseStore {
    firebase: FirebaseApp | null
    setFirebase: (firebase: FirebaseApp) => void
}

const firebaseStore = create<FirebaseStore>((set) => ({
    firebase: null,
    setFirebase: (firebase: FirebaseApp) => set({ firebase })
}))

export { useStore, firebaseStore }

