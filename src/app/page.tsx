"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostCard from "./components/PostCard";
import ProjectForm from "./components/ProjectForm";
import { postData } from "@/api/PostApi";

export default function Home() {
  const queryClient = useQueryClient();

  // Fetch posts using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const [posts, setPosts] = useState<any[]>([]);
  // State for the post that is being edited
  const [updateData, setUpdateData] = useState<{ id: number; title: string; body: string } | null>(null);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  // Function to add a new post
  const addPostData = async (newPost: { title: string; body: string }) => {
    try {
      const res = await postData(newPost);
      if (res.status === 201) {
        const uniqueId = posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 101;
        const postWithUniqueId = { ...res.data, id: uniqueId };
        setPosts([postWithUniqueId, ...posts]);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Function to update an existing post in local state (for edit)
  const updatePostData = (updatedPost: { title: string; body: string }) => {
    if (updateData) {
      setPosts(
        posts.map((post) =>
          post.id === updateData.id ? { ...post, title: updatedPost.title, body: updatedPost.body } : post
        )
      );
      setUpdateData(null);
    }
  };

  // Handle form submission: if updateData exists, update post; otherwise, add a new post.
  const handleSubmit = (formData: { title: string; body: string }) => {
    if (updateData) {
      updatePostData(formData);
    } else {
      addPostData(formData);
    }
  };

  // New deletion handler: updates local state immediately
  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main>
      <div>
        {/* Pass the onSubmit, updateData, and setUpdateData props to ProjectForm */}
        <ProjectForm onSubmit={handleSubmit} updateData={updateData} setUpdateData={setUpdateData} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 p-10 mt-10">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            onEdit={setUpdateData}   // for editing
            onDelete={handleDelete}  // for deletion
          />
        ))}
      </div>
    </main>
  );
}
