import React, { useEffect, useState } from "react";
import { getPosts } from "api/demo";
import type { PostResponse } from "types/demo";
import classes from "./Demo.module.scss";
import useLoading from "@/hooks/useLoading";

function DataFetching() {
  const [posts, setPosts] = useState<PostResponse[]>();
  const { startLoading, endLoading } = useLoading();

  const fetchAllPosts = async () => {
    startLoading();
    const result = await getPosts();
    setPosts(result);
    setTimeout(() => {
      endLoading();
    }, 1000);
  };

  useEffect(() => {
    const fetchOnePosts = async () => {
      startLoading();
      const result = await getPosts();
      setPosts([result[0]]);
      endLoading();
    };

    if (!posts) fetchOnePosts();
  }, []);

  return (
    <div>
      <button onClick={fetchAllPosts} className={classes.button}>
        Get All Data
      </button>
      {posts?.map((post) => {
        return (
          <p key={post.id}>
            {post.id} - {post.body}
          </p>
        );
      })}
    </div>
  );
}

export default DataFetching;
