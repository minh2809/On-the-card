import axios from "axios";
import type { PostResponse } from "types/demo";

export const getPosts = async (): Promise<PostResponse[]> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return response.data;
};
