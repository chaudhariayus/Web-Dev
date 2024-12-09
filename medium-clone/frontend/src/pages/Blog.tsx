import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { blogById } from "../hooks/atom";

export function Blog() {
  const { id } = useParams<{ id: string }>();  // Ensure id is typed as a string
  const blog = useRecoilValueLoadable(blogById(Number(id)));  // Convert id to number and fetch blog

  if (blog.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (blog.state === 'hasError') {
    return <div>Error</div>;
  }

  if (blog.state === 'hasValue' && blog.contents!==undefined) {
    return (
      <div>
        <h1>{blog.contents.title}</h1>
        <p>{blog.contents.content}</p>
        <p><strong>Author:</strong> {blog.contents.author.username}</p>  {/* Display the author */}
      </div>
    );
  }

  return <div>Blog not found</div>;  // Handle case when the blog is not found
}
