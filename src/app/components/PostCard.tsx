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
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 h-full">
      {/* Post ID */}
      <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
        <span className="text-sm text-slate-600 font-medium">Post ID: {id}</span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-grow">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h5>
        <p className="text-slate-600 leading-normal font-light">{body}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto px-4 pb-3 flex justify-end gap-2">
        <button onClick={handleEdit} className="btn btn-primary">Edit</button>
        <button className="btn btn-ghost" onClick={() => handleDeletePost(id)}>Delete</button>
      </div>
    </div>
  );
};

export default PostCard;
