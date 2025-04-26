import { HomeUI } from "@/components/screens/HomeUI";

export const revalidate = 60

export default async function Home() {

    const data = await fetch(process.env.RESUME_DATA_URL || '')

    const jsonUserData = await data.json();



    
    return <>
        <HomeUI 
            data={jsonUserData?.result}
        />
    </>
    
}
