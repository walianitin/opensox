
import axios from "axios";


export async function  getURL({url}:{url:string}){
    const response=await axios.get(url)
    return response.data
}