import { MdOutlineEmail } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
import { MdOutlineVerified } from "react-icons/md";

export default function Social({
  email,
  twitter,
  blog,
  is_verified,
}: {
  email: string;
  blog: string;
  is_verified: string;
  twitter: string;
}) {
  const handleEmailClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleTwitterClick = () => {
    if (twitter) {
      window.open(`https://twitter.com/${twitter}`, "_blank");
    }
  };

  const handleBlogClick = () => {
    if (blog) {
      window.open(blog, "_blank");
    }
  };

  return (
    <>
      <div className="mt-2 flex items-center justify-center gap-2">
        {email && (
          <span
            className="cursor-pointer text-blue-500 transition-colors hover:text-blue-700"
            onClick={handleEmailClick}
            title={`Email: ${email}`}
          >
            <MdOutlineEmail size={16} />
          </span>
        )}

        {twitter && (
          <span
            className="cursor-pointer text-blue-400 transition-colors hover:text-blue-600"
            onClick={handleTwitterClick}
            title={`Twitter: @${twitter}`}
          >
            <GrTwitter size={16} />
          </span>
        )}

        {blog && (
          <span
            className="cursor-pointer text-green-500 transition-colors hover:text-green-700"
            onClick={handleBlogClick}
            title={`Blog: ${blog}`}
          >
            <TfiWrite size={16} />
          </span>
        )}

        {is_verified && (
          <span>
            <MdOutlineVerified size={16} />
          </span>
        )}
      </div>
    </>
  );
}
