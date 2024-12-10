import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { blogById } from "../hooks/atom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCards";

export function Blog() {
  const { id } = useParams<{ id: string }>();  // Ensure id is typed as a string
  const blog = useRecoilValueLoadable(blogById(Number(id)));  // Convert id to number and fetch blog

  if (blog.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (blog.state === 'hasError') {
    return <div>Error</div>;
  }

  if (blog.state === 'hasValue' && blog.contents !== undefined) {
    if (blog.contents === undefined) return <div>No blog to show</div>
    return (
      <div> <Appbar/>
    <div className="flex justify-center mt-10">
      <div className="w-full mx-10 px-10 grid grid-cols-12">
        <div className="grid col-span-9 px-2 ">
        <div className="text-5xl font-extrabold pb-4"><h1>{blog.contents.title}</h1></div>
        <div className="text-slate-500">published on 2nd December</div>
        <p>{blog.contents.content}</p>
        </div>
        <div className=" grid col-span-3 px-2 ">
          <div > 
          <div className="text-slate-600 pb-2">Author</div> 
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-center"><Avatar name={blog.contents.author.username}/></div>
            <div className="pl-2">
              <div className="text-lg font-bold">{blog.contents.author.username}</div>
              <div className="pt-2 text-slate-500">Random catch phrase about author's ability to catch user attention</div>
            </div>
          </div>
          </div>
        </div>
      </div></div>
    </div >
    );
  }

  return <div>Blog not found</div>;  // Handle case when the blog is not found
}
