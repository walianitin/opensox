"use client"
import { useEffect, useState } from "react";
import type { getorgs,org } from "../utils/types";
import { Getorgs } from "../utils/Octokit";
import Filter_data from "../utils/hooks/Filter_data";
import Image from "next/image";
import { getURL } from "../utils/httpsclient";
import Social from "../components/SocialCard"
import { AppSidebar } from "./Sidebar";

export default function Orgscard(){

    const [getorgs,setorgs]=useState<getorgs[]>([])
    const [filteredOrgs,setFilteredOrgs]=useState<getorgs[]>([])
    const [searchTerm,setSearchTerm]=useState<string>("");
 
        useEffect( ()=>{
            const fetch=async ()=>{
                // const response=await axios.get("api/organizations");
                //  console.log(response.data)
                 const response=await Getorgs();
                const data: getorgs[] = JSON.parse(JSON.stringify(response));
                const filter=Filter_data(data)
                setorgs(filter)
                setFilteredOrgs(filter);

            }
            fetch()
        },[])

        const HandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(e.target.value)
        }
        //  adding the search bar
        useEffect(()=>{
            if(searchTerm===""){
                setFilteredOrgs(getorgs)

            }else{
                    const filter= getorgs.filter(org=>
                        org.login.toLowerCase().includes(searchTerm.toLowerCase())|| org.description && org.description.toLowerCase().includes(searchTerm)
                    );
                setFilteredOrgs(filter);
            }
        },[searchTerm,getorgs])
  // now  i need to filter out that that which have description null
    //now the 1000 of the orgs have been added to the getorgs;

    return (<>
            <div className=" w-full  flex flex-row m-auto p-auto">
            <div className=" min-w-1/5  border-0  shadow-lg  "> <AppSidebar/></div>
            <div className=" flex flex-col gap-3 pt-4 ">
            <span className="  flex  justify-center gap-2   ">
                <input type=" text " placeholder=" Search .." className="max-w-2xl min-w-4xl text-center rounded-xl pl-10 pr-10  border-none h-10  shadow-md border-transparent " onChange={HandleOnChange} />
            </span>
            <div className="grid grid-cols-4 gap-3 bg-background min-h-screen shadow-xs pl-0">
                    {filteredOrgs.map((org, idx) => (
                        <SingleOrgsCard  key={idx} idx={idx} org={org as getorgs} />
                    ))}
            </div>
            </div>
     </div>

    </>)
}

function SingleOrgsCard({org}:{org:getorgs, idx:number}){
    const [data]=useState(org);
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
   
    <div className="h-auto max-h-96 bg-white shadow-lg border border-gray-200 rounded-xl text-black flex flex-col items-center m-2 p-4 transition-transform duration-200 hover:scale-105 hover:shadow-2xl" >
        <span className=" ">
        <Image
            src={org.avatar_url}
            alt="logo"
            height={100}
            loading="lazy"
            width={80}
            className="rounded-full border-0 border-primary mb-2 shadow"
            />
          <Social 
            email={url_data?.email || ""} 
            twitter={url_data?.twitter_username || ""} 
            blog={url_data?.blog || ""} 
            is_verified={url_data?.is_verified ? "true" : ""} 
        />
        </span>

        <h1 className="font-bold text-lg mb-1 text-black">{org.login}</h1>
        <p className=" text-xs font-light ">{url_data?.location}</p>
        <p className="font-light text-xs text-center text-black">{org.description}</p>
        
    </div>
    </>

}
 

