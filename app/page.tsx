"use client";

import { useState, useEffect } from "react";
import { getOrgData, getOrganisation } from "./utils/httpsclient";
import { Organisations, Org, repos_url } from "./utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const [Organisations, setOrganisations] = useState<Organisations[]>([]);

  useEffect(() => {
    try{
      getOrganisation().then((orgs) => setOrganisations(orgs));
    }catch(err){
      throw err
    }
  }, []);

  return (
    <div className=" flex flex-col w-full h-screen  border-b border-amber-100 font-light text-md overflow-auto none-scrollbar">

    <table className="">
      <thead>
        <tr className="border-b border-neutral-50 text-md text-neutral-200">
          <th className="pb-4 pt-4 font-normal text-left ">Name</th>
          <th className="pb-4 pt-4 font-normal text-left">Description</th>
          <th className="pb-4 pt-4 font-normal text-left">Public Repos</th>
          <th className="pb-4 pt-4 font-normal text-left">followers</th>
          <th className="pb-4 pt-4 font-normal text-left">Languages</th>
          <th className="pb-4 pt-4 font-normal text-left">has_projects</th>
          <th className="pb-4 pt-4 font-normal text-left">Location</th>
        </tr>
      </thead>

      <tbody>
{Organisations.map((orgs, index) => (
  <OrgsTable
    key={index}
    login={orgs.login}
    url={orgs.url}
    description={orgs.description}
    avatar_url={orgs.avatar_url}
  />
))}
     </tbody>
    </table>
        </div>
  );
}

function OrgsTable({ login, url, description, avatar_url }: Organisations) {
  const [OrgData, setOrgData] = useState<Org| null>(null);
  // const router = useRouter();
  const [repos_url, setrepo_url_data]=useState<repos_url[]>([]);



  useEffect(() => {
    getOrgData(url).then((data) => {
      // Check if data is an Org (has expected properties)
      if (data && typeof data === "object") {
        setOrgData(data as Org);
      } else {
        setOrgData(null);
      }
    });

    inside_repos(OrgData?.repos_url as string).then((value)=> setrepo_url_data(value));
  }, [url]);

  return (
    <motion.tr
      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      onClick={() => {
        if (OrgData?.html_url) {
          window.open(OrgData.html_url, "_blank");
        }
      }}
      style={{ cursor: OrgData?.html_url ? "pointer" : "default" }}
    >
      <td className="border-b border-neutral-800 p-3 text-lg font-medium">
        <div className="flex items-center gap-2">
          <Image src={avatar_url} alt="avatar" width={40} height={40} className="rounded-full" />
          <span>{login.toUpperCase()}</span>
          {OrgData?.is_verified && <BadgeCheck className="text-green-500 w-4 h-4" />}
        </div>
      </td>

      <td className="border-b border-neutral-800 text-sm">
        {description || "-"}
      </td>

      <td className="border-b border-neutral-800">
        {OrgData ? OrgData.public_repos : "loading..."}
      </td>


      <td className="border-b border-neutral-800">
        {OrgData ? OrgData.followers : "loading..."}
      </td>
      <td>
          {repos_url[0]?.language|| "-"}
      </td>
      <td className="border-b border-neutral-800" >
        {OrgData?.has_organization_projects || OrgData?.has_repository_projects ? "true":"false"}
      </td>
      <td className="border-b border-neutral-800"> 
        {OrgData?.location}
      </td>
    </motion.tr>
  );
}

function getPopularityLabel(followers: number) {
  if (followers >= 0 && followers <= 50) return "very low";
  if (followers > 50 && followers <= 100) return "low";
  return "moderate";
}

 async function inside_repos(repos_url:string){  

      try{
        const response =await axios.get(repos_url)
        const data :repos_url[]= response.data;
        const filter_data= data.sort((a,b)=>{
          return b.id - a.id;
        })

        return filter_data;
      }catch(err){
        throw err
      }
}
