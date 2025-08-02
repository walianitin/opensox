
import axios from "axios";


export async function  getURL({url}:{url:string}){
    try{

        const response=await axios.get(url)
        return response.data
    }catch(err){
        return err
    }
}