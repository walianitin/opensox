"use client";

import { useState, useEffect } from "react";
import { getinsideData, getOrganisation } from "./utils/httpsclient";
import { Organisations, Org } from "./utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<Organisations[]>([]);

  useEffect(() => {
    getOrganisation().then((orgs) => setData(orgs));
  }, []);

  return (
    <div className=" flex flex-col w-1/2 h-screen overflow-scroll border-b border-amber-100 font-light text-md">

    <table className="w-full">
      <thead>
        <tr className="border-b border-neutral-50 text-md text-neutral-200">
          <th className="pb-4 pt-4 font-normal text-left ">Name</th>
          <th className="pb-4 pt-4 font-normal text-left">Description</th>
          <th className="pb-4 pt-4 font-normal text-left">Public Repos</th>
          <th className="pb-4 pt-4 font-normal text-left">Popularity</th>
          <th className="pb-4 pt-4 font-normal text-left">Languages</th>
        </tr>
      </thead>

      <tbody>
        {data.map((org, index) => (
          <OrgsTable key={index} {...org} />
        ))}
      </tbody>
    </table>
        </div>
  );
}

function OrgsTable({ login, url, description, avatar_url }: Organisations) {
  const [insideData, setInsideData] = useState<Org | null>(null);
  
  useEffect(() => {
    getinsideData(url).then((data) => setInsideData(data));
  }, [url]);

  return (
    <motion.tr whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
      <td className="border-b border-neutral-800 p-3 text-lg font-medium">
        <div className="flex items-center gap-2">
          <Image src={avatar_url} alt="avatar" width={40} height={40} className="rounded-full" />
          <span>{login.toUpperCase()}</span>
          {insideData?.is_verified && <BadgeCheck className="text-green-500 w-4 h-4" />}
        </div>
      </td>

      <td className="border-b border-neutral-800 text-sm">
        {description || "-"}
      </td>

      <td className="border-b border-neutral-800">
        {insideData ? insideData.public_repos : "loading..."}
      </td>

      <td className="border-b border-neutral-800">
        {insideData ? getPopularityLabel(insideData.followers) : "loading..."}
      </td>
    </motion.tr>
  );
}

function getPopularityLabel(followers: number) {
  if (followers >= 0 && followers <= 50) return "very low";
  if (followers > 50 && followers <= 100) return "low";
  return "moderate";
}
