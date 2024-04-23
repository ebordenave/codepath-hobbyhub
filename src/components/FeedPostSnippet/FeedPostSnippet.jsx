import "./FeedPostSnippet.css";
import {calculateTimeAgo} from "../../utils/calculateTimeAgo.js";

import {Link} from "react-router-dom";

export const FeedPostSnippet = ({ post }) => {

  const timeAgo = calculateTimeAgo(post.created_at)

  return (
    <div className="feed_wrapper">
      <div className="feed_container__card">
          {timeAgo}
          <div className="title-container">
              <Link to={`/post/${post.uuid}`}>
              {post.title}
              </Link>
          </div>upvotes: {post.votes}
      </div>
    </div>
  );
};