// Octokit.js
// https://github.com/octokit/core.js#readme


import  {Octokit} from "octokit"

const octokit = new Octokit({
    auth:"ADD YOU GIT HUB TOKEN"
})

export const Getorgs=async ()=>{
   const response= await octokit.request('GET /organizations', {
   per_page:1000,
    headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
  
})
console.log(response)
//
return response.data
}

export  const getorg=async (ORG:string)=>{
    const response =await   octokit.request('GET /orgs/{org}',{
        org:`${ORG}`,
        headers:{
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    console.log(response.data)
    return response.data
}
export const orgs_issue_type=async ()=>{
    const response=await octokit.request("GET /orgs/{org}/issue-types",{
        org:"ORG",
        headers:{
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    console.log("orgs.issue.list"+ JSON.stringify(response.data))
    return response.data
    
}