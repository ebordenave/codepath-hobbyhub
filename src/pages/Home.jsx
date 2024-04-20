import supabase from "../config/client.js";
import { useEffect, useState } from "react";

export const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await supabase
          .from("posts")
          .select();

        setPosts(data);
        setFetchError(null);
      } catch (error) {
        console.log(error);
        setFetchError(new Error(" 👀 +Could not Fetch Posts"));
        setPosts(null);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {posts && posts.map((post) => <li key={post.title}>{post.title}</li>)}
    </>
  );
};