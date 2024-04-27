import "./ParentPost.css";
import { useEffect, useState, useCallback} from "react";
import supabase from "../../config/client.js";
import {useNavigate, useParams} from "react-router-dom";
import {Comment} from "../Comment/Comment.jsx";
import Icon from '@mdi/react'
import {mdiPencil, mdiThumbDown, mdiThumbUp, mdiTrashCanOutline} from "@mdi/js";
import {calculateTimeAgo} from "../../utils/calculateTimeAgo.js";

export const ParentPost = ({ post }) => {

    // const timeAgo = calculateTimeAgo(post.created_at)
    // console.log(post)

    const [comments, setComments] = useState([])
    const {uuid} = useParams()
    const navigate = useNavigate()


    const fetchComments = async () => {

        try {
        const {data, error} = await supabase
            .from("comments")
            .select('*')
            .eq('post_id', post.uuid)

            if (error){
                console.error("Error fetching comments: ", error)
                return
            }
            setComments(data)
        } catch (e) {
            console.error('Error fetcing comments:',e)
        }

    }

    useEffect(() => {
        fetchComments()
    }, [fetchComments]);

    const [vote, setVotes] = useState(0);

    const updateVotes = useCallback(async (newVoteCount) => {
        try {
            const { data, error} = await supabase
                .from("posts")
                .update({votes: newVoteCount})
                .eq("uuid", uuid)
                .single()

            if (error) {
                console.error("Error fetching newCount", error)

            } else if (data){
                setVotes(newVoteCount)
            }
        } catch (error) {
            console.error("Error fetching votes", error.message)
        }
    })

    const fetchVotes = useCallback(async () => {
        try {
            const {data, error } = await supabase
                .from("posts")
                .select("votes")
                .eq("uuid",uuid)
                .single()

            if (error) {
                console.error("Error Fetching Votes", error)
            } else if (data) {
                setVotes(data.votes)
            }
        } catch (e) {
            console.error("Error Fetching Votes", e.message)
        }
    }, [uuid]);

    useEffect(() => {
        fetchVotes()
    }, [fetchVotes]);

    const increment = useCallback(async () => {
        const newCount = vote + 1;
        await updateVotes(newCount);
        setVotes(newCount);
    }, [vote, updateVotes]);

    const decrement = useCallback(async () => {
        const newCount = vote - 1;
        await updateVotes(newCount);
        setVotes(newCount);
    }, [vote, updateVotes]);

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from("posts")
            .delete()
            .eq("uuid", uuid)
            .select();

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            console.log(data);
            navigate("/")
        }
    };

    return (
        <div className="card__container">
            <div className="card">
                {/* eslint-disable-next-line react/prop-types */}
                {/*{timeAgo}*/}
                <div>{(vote ?? 0) >= 0 ? `${vote} likes` : `${vote} dislikes` }</div>
                <strong>{post.title}</strong>
                <div>{post.description}</div>
                <img src={post.image_url} alt=""/>
                <div className="upvote-downvote-buttons">
                    <button onClick={increment}><Icon path={mdiThumbUp} /></button>
                    <button onClick={decrement}><Icon path={mdiThumbDown} /></button>
                    <button onClick={()=> navigate('/create', {state: {post}})}><Icon path={mdiPencil}/></button>
                    <button onClick={handleDelete}><Icon path={mdiTrashCanOutline}/></button>
                </div>
                <div>
                    <Comment postUuid={post.uuid} onCommentAdded={fetchComments} existingContent={post.description}/>
                    {comments.map((comment) => (
                        <div key={comment.id} className="comments">
                            <p>- {comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};