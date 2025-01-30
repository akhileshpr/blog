import React from "react";
import Form from "./components/form";
import Auth from "./Pages/auth";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Single from "./Pages/single";
import Layout from "./components/layout";
import Profile from "./Pages/dashboard/profile";
import Blog from "./Pages/dashboard/blog";
import Post from "./Pages/dashboard/post";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state)=>state.token);
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        
         <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="post" element={<Post />} />
          <Route path="blog" element={<Blog />} />  

        </Route>
      </Routes>
    </div>
  );
};

export default App;

