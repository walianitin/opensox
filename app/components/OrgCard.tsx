"use client"
import { useEffect, useState } from "react";
import type { getorgs,org } from "../utils/types";
import { getorg, Getorgs } from "../utils/Octokit";
import Filter_data from "../utils/hooks/Filter_data";

import { getURL } from "../utils/httpsclient";

import Social from "../components/SocialCard"
export default function Orgscard(){

    const [getorgs,setorgs]=useState<getorgs[]>([]);
 
        useEffect( ()=>{
            const fetch=async ()=>{
                const response=await Getorgs();
                const data: getorgs[] = JSON.parse(JSON.stringify(response));
                const filter=Filter_data(data)
                setorgs(filter)

            }
            fetch()
        },[])
  // now  i need to filter out that that which have description null
    //now the 1000 of the orgs have been added to the getorgs;

    return (<>
            <div className=" w-full h-screen flex flex-row">
            <div className=" w-2/3 h-full p-4 border-1 border-amber-100 "> this will have the filter</div>
            <div className="grid grid-cols-4 gap-3 m-auto   ">
                    {getorgs.map((org, idx) => (
                        <SingleOrgsCard key={idx} org={org as getorgs} />
                    ))}
            </div>
     </div>

    </>)
}
function SingleOrgsCard({org,key}:{org:getorgs, key:number}){
    const [data,setdata]=useState(org);
    const [url_data,seturl_data]=useState<org>()
    
    useEffect(() => {
        const fetchData = async () => {
            console.log(data.url)
            const response = await getURL({url:data.url});
            seturl_data(response);
           
        };
        fetchData();
    }, [data.url]);
   
    return <>
   
    <div className="h-auto max-h-96 bg-white shadow-lg border border-gray-200 rounded-xl text-black flex flex-col items-center m-2 p-4 transition-transform duration-200 hover:scale-105 hover:shadow-2xl" key={key}>
        <img
            src={org.avatar_url}
            alt="logo"
            height={100}
            width={80}
            className="rounded-full border-0 border-primary mb-2 shadow"
        />
        <h1 className="font-bold text-lg mb-1 text-black">{org.login}</h1>
        <p className=" text-xs font-light "> { url_data?.location}</p>
        <p className="font-light text-xs text-center text-black">{org.description}</p>
        
        {/* Social links */}
        <Social 
            email={url_data?.email || ""} 
            twitter={url_data?.twitter_username || ""} 
            blog={url_data?.blog || ""} 
            is_verified={url_data?.is_verified ? "true" : ""} 
        />
    
    </div>
    </>

}
 

