import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// GET
export const getPost = () => {
  return api.get("/posts");
};

// DELETE
export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

// POST
export interface PostData {
  title: string;
  body: string;
}

export const postData = (post: PostData) => {
  return api.post("/posts", post);
};
