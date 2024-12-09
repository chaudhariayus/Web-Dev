import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { RecoilRoot } from "recoil";
import { Blog } from "./pages/Blog";

export default function App() {
  return (
    <RecoilRoot> {/* Move RecoilRoot outside of Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
