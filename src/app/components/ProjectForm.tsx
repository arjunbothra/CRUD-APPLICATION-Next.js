"use client";

import React, { useState, useEffect } from 'react';

interface ProjectFormProps {
  onSubmit: (data: { title: string; body: string }) => void;
  updateData?: { id: number; title: string; body: string } | null;
  setUpdateData?: React.Dispatch<React.SetStateAction<{ id: number; title: string; body: string } | null>>;
}


const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, updateData, setUpdateData }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  
  useEffect(() => {
    if (updateData) {
      setFormData({
        title: updateData.title,
        body: updateData.body,
      });
    }
  }, [updateData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", body: "" });
    if (setUpdateData) {
      setUpdateData(null);
    }
  };

  return (
<div className="max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md text-white shadow-sm rounded-xl flex flex-col min-h-[500px]">
  <h2 className="text-2xl font-semibold text-center">{updateData ? "Edit Post" : "Add Post"}</h2>
  
  <form onSubmit={handleFormSubmit} className="flex flex-col flex-1">
    {/* Fields Container */}
    <div className="flex flex-col space-y-4 flex-grow">
      {/* Title Field */}
      <div>
  <label htmlFor="title" className="block text-xl font-semibold text-[#d0eaff]">
    Title
  </label>
  <input
    type="text"
    name="title"
    id="title"
    value={formData.title}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 bg-white/10 text-[#d0eaff] border border-[#d0eaff]/30 rounded-md shadow-sm placeholder-[#d0eaff]/50 focus:outline-none focus:ring-2 focus:ring-[#d0eaff]/50 focus:border-[#d0eaff]/50"
    placeholder="Enter project title"
    required
  />
</div>


      {/* Content Field */}
      <div>
  <label htmlFor="body" className="block text-xl font-semibold text-[#d0eaff]">
    Content
  </label>
  <textarea
    name="body"
    id="body"
    value={formData.body}
    onChange={handleInputChange}
    className="mt-1 block w-full h-40 px-3 py-2 bg-white/10 text-[#d0eaff] border border-[#d0eaff]/30 rounded-md shadow-sm placeholder-[#d0eaff]/50 focus:outline-none focus:ring-2 focus:ring-[#d0eaff]/50 focus:border-[#d0eaff]/50"
    placeholder="Type content here"
    required
  ></textarea>
</div>

    </div>

    {/* Submit Button */}
    <div className="mt-auto flex justify-center">
      <button
        type="submit"
        className="w-[90%] py-2 bg-white border font-semibold 
        border-black text-black rounded-md hover:bg-white/80 
        hover:text-black hover:font-semibold transition-colors duration-300"
      >
        Submit
      </button>
    </div>
  </form>
</div>



  
  );
};

export default ProjectForm;
