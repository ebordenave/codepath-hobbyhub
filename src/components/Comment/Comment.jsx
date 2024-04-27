import { useState } from 'react';
import supabase from "../../config/client.js";
import './Comment.css'
export const Comment = ({ postUuid, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
          .from("comments")
          .insert([{content, post_id: postUuid}]);

      if (error) {
        console.error("Error creating a Comment", error)
      }

      if(data) {
        console.log("Comment created", data)
        onCommentAdded()
      }
    } catch (e) {
      console.error(e.messages)
    }
  }

  return (
      <div className="comment-box">
        <form onSubmit={handleSubmit}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Leave a comment..."
        />
          <button type="submit">Post Comment</button>
        </form>
      </div>
  );
};