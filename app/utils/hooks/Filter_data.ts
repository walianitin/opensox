import { getorgs } from "../types";

// Ensure getorgs is typed as an array
export default function Filter_data(getorgs: getorgs[]){
    
    const filtered_data: getorgs[] = [];
    
    for (const org of getorgs) {
        if (org.description==null || org.description=="") {
            //filtered_data.push(org);
        }
        else filtered_data.push(org)
    }
    return filtered_data;
}