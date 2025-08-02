"use client";
import { useEffect, useState } from "react";
import type { getorgs, org } from "../utils/types";
import { Getorgs } from "../utils/Octokit";
import Filter_data from "../utils/hooks/Filter_data";
import Image from "next/image";
import { getURL } from "../utils/httpsclient";
import Social from "../components/SocialCard";
import { AppSidebar } from "./Sidebar";

export default function Orgscard() {
  const [getorgs, setorgs] = useState<getorgs[]>([]);
  const [filteredOrgs, setFilteredOrgs] = useState<getorgs[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const response = await Getorgs();
      const data: getorgs[] = JSON.parse(JSON.stringify(response));
      const filter = Filter_data(data);
      setorgs(filter);
      setFilteredOrgs(filter);
    };
    fetch();
  }, []);

  const HandleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //  adding the search bar
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOrgs(getorgs);
    } else {
      const filter = getorgs.filter(
        (org) =>
          org.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (org.description &&
            org.description.toLowerCase().includes(searchTerm)),
      );
      setFilteredOrgs(filter);
    }
  }, [searchTerm, getorgs]);
  // now  i need to filter out that that which have description null
  //now the 1000 of the orgs have been added to the getorgs;

  return (
    <>
      <div className="p-auto m-auto flex w-full flex-row">
        <div className="min-w-1/5 border-0 shadow-lg">
          {" "}
          <AppSidebar />
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <span className="flex justify-center gap-2">
            <input
              type=" text "
              placeholder=" Search .."
              className="h-10 max-w-2xl min-w-4xl rounded-xl border-none border-transparent pr-10 pl-10 text-center shadow-md"
              onChange={HandleOnChange}
            />
          </span>
          <div className="bg-background grid min-h-screen grid-cols-4 gap-3 pl-0 shadow-xs">
            {filteredOrgs.map((org, idx) => (
              <SingleOrgsCard key={idx} idx={idx} org={org as getorgs} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SingleOrgsCard({ org }: { org: getorgs; idx: number }) {
  const [data] = useState(org);
  const [url_data, seturl_data] = useState<org>();

  useEffect(() => {
    const fetchData = async () => {
      console.log(data.url);
      const response = await getURL({ url: data.url });
      seturl_data(response);
    };
    fetchData();
  }, [data.url]);

  const handle_git_travel = (e: React.MouseEvent) => {
    if (url_data?.html_url) {
      window.open(url_data.html_url);
    }
  };
  return (
    <>
      <div
        className="m-2 flex h-auto max-h-96 cursor-pointer flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-black shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
        onClick={handle_git_travel}
      >
        <span className="flex justify-center">
          <Image
            src={org.avatar_url}
            alt="logo"
            height={100}
            loading="lazy"
            width={80}
            className="border-primary mb-2 rounded-full border-0 shadow"
          />
          <Social
            email={url_data?.email || ""}
            twitter={url_data?.twitter_username || ""}
            blog={url_data?.blog || ""}
            is_verified={url_data?.is_verified ? "true" : ""}
          />
        </span>

        <h1 className="mb-1 text-lg font-bold text-black">{org.login}</h1>
        <p className="text-xs font-light">{url_data?.location}</p>
        <p className="text-center text-xs font-light text-black">
          {org.description}
        </p>
      </div>
    </>
  );
}
