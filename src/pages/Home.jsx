import "./Pages.css"
import supabase from "../config/client.js";
import { useEffect, useState } from "react";
import {FeedPostSnippet} from "../components/FeedPostSnippet/FeedPostSnippet.jsx";
import {DateTime} from "luxon";


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
        setFetchError(new Error(" 👀 + Could not Fetch Posts"));
        setPosts(null);
      }
    };
    fetchPosts();
  }, []);

  const sortPosts = (attribute) => {
    const sorted = [...posts].sort((a,b)=> {
      if (attribute === "votes") {
        return b.votes - a.votes
      } else if (attribute === "title") {
        return a.title.localeCompare(b.title)
      } else if (attribute === "created_at"){
        return DateTime.fromISO(a.created_at) - DateTime.fromISO(b.created_at)
      }
    })
    setPosts(sorted)
  }



  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      <div className="filter-buttons">
        Sort By:
        <button onClick={()=>sortPosts("votes")}>Most Popular</button>
        <button onClick={()=>sortPosts("created_at")}>Newest</button>
        <button onClick={()=>sortPosts("title")}>Alphanumeric Order</button>
      </div>
      <div className="feed_wrapper">
        {posts && posts.map((post) => (
            <div key={post.id}>
              <FeedPostSnippet post={post}/>
            </div>))}
      </div>
    </>
  );
};