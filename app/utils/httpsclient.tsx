
import axios from "axios";
import { Organisations, Org } from "./types";
const Base_Url="https://api.github.com";



export async function  getOrganisation():Promise<Organisations[]>{
    const response =await axios.get(`${Base_Url}/organizations`)
    const data= response.data.sort((a:Organisations,b:Organisations)=>{
            return 0
    });
    return data;

}

export async function getinsideData(url:string) {
    const response= await axios.get(`${url}`)
    const data:Org=response.data;
    return data;
    
}

export async function  getIssues(url:string) {
    const repos_url= await axios.get(`${url}`);

    const data=repos_url.data;
    return 
    
}

export function Popularity(followers:number){
  if(followers>=0  && followers<=50) return   "very low";
  else if (followers>50 && followers<=100 ) return "low";
   return "moderate";


}
