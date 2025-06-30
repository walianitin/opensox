"use client"

import { useState,useEffect} from "react";
import { getinsideData, getOrganisation} from "./utils/httpsclient";
import { Organisations,Org } from "./utils/types";


export default function Home() {

const [data, setdata]= useState<Organisations[]>([]);
const [org,setorg]=useState<Org[]>([])

    useEffect(()=>{
        getOrganisation().then((data)=> {
          setdata(data);
        });
    }, []);


    return (
    <table>
      <thead>
        <tr> 
          {/* <th> avatar_url</th> */}
          <th> Name</th>
          <th> descriptions </th>
          <th> Language</th>
          <th> Issuses</th>
        </tr>
      </thead>

      <tbody>
        { data.map((org:Organisations,index:number)=>{
              return (
                <OrgsTable
                  login={org.login}
                  url={org.url}
                  description={org.description}
                  avatar_url={org.avatar_url}
                />
              );
        })}
      </tbody>
    </table>
  );
}


function OrgsTable({login,url,description,avatar_url}:Organisations){
    const  [insideData,setInsidedata]=useState<Org>();


    useEffect(()=>{
      getinsideData(url).then((data)=>{
      setInsidedata(data);
      })
    },[])

    return (
      <tr>
      {/* <td><img src={avatar_url} alt={login} width={32} height={32} /></td> */}
      <td>{login}</td>
      <td>{description ? description: "-"}</td>
      {/* <td>{insideData?.language ?? "N/A"}</td> */}
      {/* <td>{insideData?. ?? "N/A"}</td> */}
      </tr>
    );


    return <tr>

    </tr>
}