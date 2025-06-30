
import { NextResponse } from "next/server";

const Base_Url="https://api.github.com"

export async function  GET() {
  
  try{
        console.log("reaced the api")
      const response  = await fetch(`${Base_Url}/orgs`);
      if(!response){
          throw new Error(" Could not fetch data from "+`${Base_Url}/orgs`)
        }
        const data= await response.json();
        console.log(data);
        return NextResponse.json(data);
    }catch(error){
        return NextResponse.json({
            message:" Could not fetch data from "+`${Base_Url}/orgs`
        })
    }
}
