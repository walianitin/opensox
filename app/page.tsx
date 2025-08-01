"use client";

import {  Org, repos_url } from "./utils/types";
import { motion, usePageInView } from "framer-motion";
import Image from "next/image";

import axios from "axios";
import Orgscard from "./components/OrgCard";




export default function Home() {
  // // const [Organisations, setOrganisations] = useState<Organisations[]>([]);
  // const [loading ,setloading]=useState<boolean>(true);
  // const [err,seterrors]=useState<string>("");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 10; // Number of items per page
  // const totalPages = Math.ceil(Organisations.length / itemsPerPage);
  // const startindex: number = (currentPage - 1) * itemsPerPage;
  // const endIndex=startindex + itemsPerPage;
  // const currentItems = Organisations.slice(startindex, endIndex);

  return (
    <>
        <div className=" w-full h-screens">
          <Orgscard/>
          </div>
    </>
  )
}

function Tablefooter({
  currentpage,
  setCurrentPage,
  totalPages,
}: {
  currentpage: number;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
  totalPages: number;
}) {
  return (
    <tfoot>
      <tr className="bg-neutral-900 text-white">
        <td colSpan={7} className="text-center py-3">
          <div className="flex justify-center items-center gap-4">
            {/* Pagination controls can be added here */}
            <button className="px-4 py-2 bg-blue-900/10 text-white rounded hover:bg-blue-600 transition-colors" onClick={()=>{
              setCurrentPage((prev: number) => Math.max(prev - 1, 1));
            }}>
              Previous
            </button>
            <span>Page {currentpage} of 10</span>
            <button
              className="px-4 py-2 bg-blue-900/10 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                setCurrentPage((prev: number) => Math.min(prev + 1, totalPages));
              }}
            >
              Next
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}
function Loading(){
  return (
    <div className=" flex justify-centre items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  )
}
function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center h-full text-red-500">
      {message}
    </div>
  );
}

function TableHeader({ columns }: { columns: { key: string; label: string; width: string }[] }) {
  return (
    <thead className="sticky top-0 z-10"> 
      <tr className="bg-neutral-900 text-white text-left">
        {columns.map((column) => (
          <th 
            key={column.key}
            className={`
              ${column.width} 
              px-4 py-3 
              font-semibold 
              text-sm 
              border-b border-neutral-700
              hover:bg-neutral-800 transition-colors
            `}
            scope="col" // Better accessibility
            aria-sort="none" // Indicates sortable columns
          >
            <div className="flex items-center gap-2">
              {column.label}
                       </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

// function OrgsRow({orgs,columns }:{orgs:Organisations, columns:{ key: string; label: string; width: string }[]}) {


//   const [OrgData, setOrgData] = useState<Org| null>(null);
//   // const router = useRouter();
//   const [repos_url, setrepo_url_data]=useState<repos_url[]>([]);
//   const [rowloading, setRowLoading] = useState<boolean>(true);


//   useEffect(() => {
//     setRowLoading(true);
// try{ 
//       getOrgData(orgs.url).then((data) => {
//   // Check if data is an Org by checking for repos_url property
//   if (data && typeof data === "object" && "repos_url" in data) {
//     setOrgData(data as Org);
//     if ((data as Org).repos_url) {
//       inside_repos((data as Org).repos_url).then((value) => setrepo_url_data(value));
//     }
//   } else {
//     setOrgData(null);
//   }
// });
//  }
//      catch(err) {
//       console.error("Error fetching organization data:", err);
//     } finally { 
//       setRowLoading(false);
//     }
//   },[orgs.url]);

//   // if(rowloading) return  <Loading />;


//   return (
//     <motion.tr
//       whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
//       onClick={() => {
//         if (OrgData?.html_url) {
//           window.open(OrgData.html_url, "_blank");
//         }
//       }}
//       style={{ cursor: OrgData?.html_url ? "pointer" : "default" }}
//     >
//       <td className="border-b border-neutral-800 p-3 text-lg font-medium">
//         <div className="flex items-center gap-2">
//           <Image src={orgs.avatar_url} alt="avatar" width={40} height={40} className="rounded-full" />
//           <span>{orgs.login.toUpperCase()}</span>
//           {OrgData?.is_verified && <BadgeCheck className="text-green-500 w-4 h-4" />}
//         </div>
//       </td>

//       <td className="border-b border-neutral-800 text-sm">
//         {orgs.description || "-"}
//       </td>

//       <td className="border-b border-neutral-800">
//         {OrgData ? OrgData.public_repos : "loading..."}
//       </td>


//       <td className="border-b border-neutral-800">
//         {OrgData ? OrgData.followers : "loading..."}
//       </td>
//       <td>
//           {repos_url[0]?.language|| "-"}
//       </td>
//       <td className="border-b border-neutral-800" >
//         {OrgData?.has_organization_projects || OrgData?.has_repository_projects ? "true":"false"}
//       </td>
//       <td className="border-b border-neutral-800"> 
//         {OrgData?.location}
//       </td>
//     </motion.tr>
//   );
// }

function getPopularityLabel(followers: number) {
  if (followers >= 0 && followers <= 50) return "very low";
  if (followers > 50 && followers <= 100) return "low";
  return "moderate";
}

 async function inside_repos(repos_url:string){  

      try{
        const response =await axios.get(repos_url)
        const data :repos_url[]= response.data;
        const filter_data= data.sort((a,b)=>{
          return b.id - a.id;
        })

        return filter_data;
      }catch(err){
        throw err

      }
}