"use client";

import React from "react";
import { deletePost } from "@/api/PostApi";
import { useMutation } from "@tanstack/react-query";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  onEdit: (post: { id: number; title: string; body: string }) => void;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, onEdit, onDelete }) => {

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, variables) => {
      // Only update local state via onDelete
      onDelete(variables);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleEdit = () => {
    onEdit({ id, title, body });
  };

  return (
<div className="card relative flex flex-col my-6 bg-white/5 backdrop-blur-md text-[#d0eaff] shadow-sm rounded-xl transform transition duration-300 hover:scale-105 min-h-[300px]">
  {/* Card Content */}
  <div className="p-4 text-[#d0eaff] flex-grow text-center space-y-8">
    <h5 className="text-xl font-semibold first-letter:uppercase">{title}</h5>
    <p className="leading-normal  font-light">{body}</p>
  </div>

  {/* Action Buttons (fixed at bottom) */}
  <div className="mt-auto px-4 pb-3 flex justify-end gap-2">
    <button
      onClick={handleEdit}
      className="bg-white border font-semibold border-black text-black px-4 py-2 rounded-md hover:bg-white/80 hover:text-black hover:font-semibold transition-colors duration-300"
    >
      Edit
    </button>
    <button
      onClick={() => handleDeletePost(id)}
      className="bg-black/60 border border-black text-[#d0eaff] font-semibold px-4 py-2 rounded-md transition-colors duration-300 hover:bg-white/20 hover:text-[#d0eaff] hover:font-semibold"
    >
      Delete
    </button>
  </div>
</div>


  
  

  );
};

export default PostCard;
