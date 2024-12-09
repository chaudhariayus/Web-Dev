import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog{
    "title": string,
    "content": string,
    "id": number,
    "author":{
      "username":string
    }
  }

export function UseBlogs(){
    const [loading,setloading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
           headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
           }
        }).then((res)=>{
            setBlogs(res.data.posts);
            setloading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}