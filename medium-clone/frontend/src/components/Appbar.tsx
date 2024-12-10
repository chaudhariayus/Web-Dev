import { Link ,useNavigate} from "react-router-dom"
import { useRecoilValue } from "recoil";
import { currentuser } from "../hooks/atom";


export function Appbar(){
    const navigate=useNavigate();
    const username=useRecoilValue(currentuser);
    return <div className="flex justify-between px-10 border-b items-center py-3">
        <Link to="/blogs">
            <div className="font-semibold ">Medium</div>
        </Link>
        <div className="flex">
        <button type="button" onClick={()=>{
            localStorage.removeItem("token");
            navigate("/")
        }} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        <Link to="/publish"><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button></Link>
        <Avatar name={username}/>
        </div>
    </div>
}

type AvatarProps = {
    name: string | null | undefined;
  };
  
  function Avatar({ name }: AvatarProps) {
    const displayName = name ? name[0].toUpperCase() : "U"; // Default to "U" for "Unknown"
  
    return (
      <div className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center text-base font-semibold">
        {displayName}
      </div>
    );
  }
  
 
  