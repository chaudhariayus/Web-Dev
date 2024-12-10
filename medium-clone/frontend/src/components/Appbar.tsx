import { Link } from "react-router-dom"


export function Appbar(){
    return <div className="flex justify-between px-10 border-b items-center py-3">
        <Link to="/blogs">
            <div className="font-semibold ">Medium</div>
        </Link>
        <div className="flex">
        <Link to="/publish"><button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button></Link>
        <Avatar name="Ayush"/>
        </div>
    </div>
}

function Avatar({name}:{name:string}){
    return<div className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center text-base font-semibold"> {name[0].toUpperCase()}
    </div>
}