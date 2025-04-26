import { HomeUI } from "@/components/screens/HomeUI";

export const revalidate = 60

export default async function Home() {

    const data = await fetch('https://3yxxme9l.api.sanity.io/v2025-04-26/data/query/production?query=*%5B_type+%3D%3D+%27portfolioDetails%27%5D+%7B%0A++...%2C%0A++resume+%7B%0A++++%27url%27%3Aasset-%3Eurl%0A++%7D%2C%0A++logo+%7B%0A++++%27url%27%3Aasset-%3Eurl%0A++%7D%0A%7D%5B0%5D&perspective=drafts')

    const jsonUserData = await data.json();



    
    return <>
        <HomeUI 
            data={jsonUserData?.result}
        />
    </>
    
}
