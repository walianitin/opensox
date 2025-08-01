 
import {  MdOutlineEmail  } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlineVerified } from "react-icons/md";

 export default function Social({email, twitter, blog, is_verified}:{email:string,blog:string,is_verified:string, twitter:string}){

    const handleEmailClick = () => {
        if (email) {
            window.location.href = `mailto:${email}`;
        }
    };

    const handleTwitterClick = () => {
        if (twitter) {
            window.open(`https://twitter.com/${twitter}`, '_blank');
        }
    };

    const handleBlogClick = () => {
        if (blog) {
            window.open(blog, '_blank');
        }
    };

    return <>
        <div className="flex  gap-2 items-center justify-center mt-2">
            {email && (
                <span 
                    className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={handleEmailClick}
                    title={`Email: ${email}`}
                >
                    <MdOutlineEmail size={16} />
                </span>
            )}
            
            {twitter && (
                <span 
                    className="cursor-pointer text-blue-400 hover:text-blue-600 transition-colors"
                    onClick={handleTwitterClick}
                    title={`Twitter: @${twitter}`}
                >
                    <GrTwitter  size={16} />
                </span>
            )}
            
            {blog && (
                <span 
                    className="cursor-pointer text-green-500 hover:text-green-700 transition-colors"
                    onClick={handleBlogClick}
                    title={`Blog: ${blog}`}
                >
                    <TfiWrite size={16} />
                </span>
            )}
            
            {is_verified && (
                <span>
                    <MdOutlineVerified size={16} />
                </span>  )}
        </div>
    </>

}