import { HomeUI } from "@/components/screens/HomeUI";


export default async function Home() {

    const data = await fetch('https://simplejsoncms-ecru.vercel.app/api/mushfiqah-portfolio')

    const jsonUserData = await data.json();



    
    return <>
        <HomeUI 
            data={jsonUserData}
        />
    </>
    
}
