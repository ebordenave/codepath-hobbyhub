import { ParentPost } from "../components/ParentPost/ParentPost.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/client.js";

export const PostPage = () => {
  const { uuid } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, description, image_url, uuid")
        .eq("uuid", uuid)
        .single();

      if (error) {
        console.error("Error fetching posts", error);
      } else if (data) {
        setPost(data);
        setIsLoading(false)
      }
    };
    fetchPost();
  }, [uuid]);

  if (isLoading) {
    return <div>
      is Loading...
    </div>
  }

  return (
    <>
      <ParentPost post={post} />{" "}
    </>
  );
};