import { selector, selectorFamily } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Blog } from "./UseBlogs";

export const posts = selector<Blog[]>({
  key: "allblogs",
  get: async () => {
    const response = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
        headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`
        }
     });
    return response.data.posts;
  }
});




// Define the blogById selectorFamily with proper typing
export const blogById = selectorFamily<Blog | undefined, number>({
  key: "blogbyid",
  get: (id) => ({ get }) => {
    const post = get(posts); // Assuming posts is defined as a selector that returns Blog[]
    return post.find((x: Blog) => x.id === id);  // Return the blog or undefined if not found
  }
});
