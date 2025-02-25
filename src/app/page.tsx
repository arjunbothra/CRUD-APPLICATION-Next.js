"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import PostCard from "./components/PostCard";
import ProjectForm from "./components/ProjectForm";
import { postData } from "@/api/PostApi";
import Pagination from "./components/Pagination";

export default function Home() {
  const[page, setPage]=useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [updateData, setUpdateData] = useState<{ id: number; title: string; body: string } | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

 
  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // New Post
  const addPostData = async (newPost: { title: string; body: string }) => {
    try {
      const res = await postData(newPost);
      if (res.status === 201) {
        const uniqueId =
          posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 101;
        const postWithUniqueId = { ...res.data, id: uniqueId };
        setPosts([postWithUniqueId, ...posts]);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Update Function
  const updatePostData = (updatedPost: { title: string; body: string }) => {
    if (updateData) {
      setPosts(
        posts.map((post) =>
          post.id === updateData.id
            ? { ...post, title: updatedPost.title, body: updatedPost.body }
            : post
        )
      );
      setUpdateData(null);
    }
  };

  // Submit Function
  const handleSubmit = (formData: { title: string; body: string }) => {
    if (updateData) {
      updatePostData(formData);
    } else {
      addPostData(formData);
    }
  };

  // Delete Function
  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

// Pagination
 const totalPages = Math.ceil(posts.length / 24);
 
 const paginatedPosts = useMemo(() => {
   const startIndex = (page - 1) * 24;
   return posts.slice(startIndex, startIndex + 24);
 }, [posts, page]);
 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative">
  {/* NavBar */}
  <NavBar />

  {/* Responsive */}
  <div className="block pt-20 md:hidden p-4 mt-20">
    <ProjectForm
      onSubmit={handleSubmit}
      updateData={updateData}
      setUpdateData={setUpdateData}
    />
  </div>

  {/* Left */}
  <div className="hidden md:block fixed top-0 left-0 h-screen w-[25%] p-4 overflow-y-auto bg-transparent">
    <div className="flex h-full items-start justify-center">
      <div className="w-full mt-[30%]">
        <ProjectForm
          onSubmit={handleSubmit}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      </div>
    </div>
  </div>

  {/* Right Content*/}
  <div className="ml-0 md:ml-[25%] w-full md:w-[75%] bg-transparent pt-24">
    <div className="p-8 mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Heading */}
      <h2 className="col-span-full text-3xl font-montserrat font-bold text-white mb-6">
        Posts
      </h2>
      {/* Cards */}
      {posts.slice(page*24-24,page*24).map((post: { id: number; title: string; body: string }) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          onEdit={setUpdateData}
          onDelete={handleDelete}
        />
      ))}
    </div>
    
  </div>

  {/* Pagination */}
  {posts.length > 0 && 
  <div className="flex justify-center my-5 mx-1">
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  </div>
}

</div>

  );
}
