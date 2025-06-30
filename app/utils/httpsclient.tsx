
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