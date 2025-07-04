
import axios from "axios";
import { Organisations, Org } from "./types";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const Base_Url="https://api.github.com";
// Use process.env.GITHUB_API_TOKEN directly in your code


export async function  getOrganisation():Promise<Organisations[]>{
    try{

        const response =await axios.get(`${Base_Url}/organizations?per_page=1000`,
            {
                headers: {
                    Authorization: "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"
                }
            }
        )
        const data= response.data;
        return data;
    }catch(err){
        // Option 1: throw the error to be handled by the caller
        throw err;
        // Option 2: return an empty array if you want to handle errors silently
        // return [];
    }

}

export async function getOrgData(url:string) {
    try{

        const response= await axios.get(`${url}`,{
            headers:{
                Authorization: "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"
            }
        })
        const data:Org=response.data;
        return data;
    }catch(err){
        return NextResponse.json({
            message:err
        })
    }
    
}

export async function  getIssues(url:string) {
    const repos_url= await axios.get(`${url}`, {
            headers: {
                Authorization: "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"
            }
        }
    );

    const data=repos_url.data;
    return  data;
    
}

export function Popularity(followers:number){
  if(followers>=0  && followers<=50) return   "very low";
  else if (followers>50 && followers<=100 ) return "low";
   return "moderate";


}
