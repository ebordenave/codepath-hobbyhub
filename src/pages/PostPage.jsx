import { ParentPost } from "../components/ParentPost/ParentPost.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/client.js";

export const PostPage = () => {
  const { uuid } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("title, description, image_url")
        .eq("uuid", uuid)
        .single();

      if (error) {
        console.error("Error fetching posts", error);
      } else if (data) {
        setPost(data);
      }
    };
    fetchPost();
  }, [uuid]);

  return (
    <>
      <ParentPost post={post} />{" "}
    </>
  );
};