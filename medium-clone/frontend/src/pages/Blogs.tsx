import { Appbar } from "../components/Appbar";
import { BlogCards } from "../components/BlogCards";
import { posts } from "../hooks/atom";
import { useRecoilValueLoadable } from "recoil";

export function Blogs() {
  // Get the blogs with useRecoilValueLoadable
  const blogs = useRecoilValueLoadable(posts);

  // Handle loading state
  if (blogs.state === "loading") {
    return (
      <div>
        <Appbar />
        <div className="flex flex-col items-center p-4">
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (blogs.state === "hasError") {
    return (
      <div>
        <Appbar />
        <div className="flex flex-col items-center p-4">
          <p>Error loading blogs. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Handle when blogs are available
  if (blogs.state === "hasValue") {
    return (
      <div>
        <Appbar />
        <div className="flex flex-col items-center p-4">
          {blogs.contents.map((b) => (
            <BlogCards
              key={b.id} // Ensure to provide a key for each list item
              authorname={b.author.username}
              title={b.title}
              content={b.content}
              id={b.id}
              publishedDate="12 Dec 2023" // You may want to update this with actual publish date
            />
          ))}
        </div>
      </div>
    );
  }

  return null; // If none of the states match
}
