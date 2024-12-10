import { useState } from "react";
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title,setTitle]=useState("");
    const [content,setcontent]=useState("");
    const navigate=useNavigate();
    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full mt-8 ">
                <div className="max-w-screen-lg w-full mb-4 border-b border-r border-l border-gray-200 rounded-lg bg-gray-50">
                    <input onChange={(e)=>{setTitle(e.target.value)}}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none" // Removed default focus styles
                        placeholder="Title"
                        required
                    />
                    <TextEditor onChange={(e)=>{setcontent(e.target.value)}}/>
                    <div className="flex items-center justify-between px-3 py-2 border-t mt-2">
                    <button onClick={async()=>{
                        const response = await axios.post(`${BACKEND_URL}api/v1/blog`,{title,content},{
                            headers:{
                             Authorization:`Bearer ${localStorage.getItem("token")}`
                            }
                         });
                         navigate(`/blog/${response.data.id}`);
                    }}
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-0 hover:bg-blue-800"
                    >
                        Publish Blog
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

function TextEditor({onChange}:{onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <form className="mt-2">
        
                <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
                    <textarea onChange={onChange}
                        rows={4}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:outline-none" // Removed default focus styles
                        placeholder="Write a Blog..."
                        required
                    ></textarea>
                </div>
           
        </form>
    );
}
