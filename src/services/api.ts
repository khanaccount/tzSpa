import axios from "axios";
import { Post } from "interface/index";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    throw error;
  }
};

export const getCommentsByPostId = async (postId: number) => {
  const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};
