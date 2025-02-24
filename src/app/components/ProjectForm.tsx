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

  // Prefill the form when updateData is provided
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
    // Optionally reset the form and clear updateData after submission
    setFormData({ title: "", body: "" });
    if (setUpdateData) {
      setUpdateData(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
        {updateData ? "Edit Post" : "Add Post"}
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-slate-400"
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Project Body Field */}
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-slate-700">
            Project Body
          </label>
          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-slate-400"
            placeholder="Enter project details"
            rows={4}
            required
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-slate-800 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:border-slate-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
