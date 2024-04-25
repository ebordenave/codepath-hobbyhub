import "./ParentPost.css";
import { useEffect, useState, useCallback} from "react";
import supabase from "../../config/client.js";
import {useNavigate, useParams} from "react-router-dom";

export const ParentPost = ({ post }) => {
    const {uuid} = useParams()
    const navigate = useNavigate()

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

    // const handleEdit = async () => {
    //     const {data, error} = await supabase
    //         .from("posts")
    //         .update({title:title,description: description, image_url: image_url})
    //         .eq("uuid",uuid)
    //
    //     if (error) {
    //         console.error("Error updating title, description, image_url")
    //         return
    //     }
    //     if (data) {
    //         console.log(data)
    //         // navigate() I think I need an edit page here
    //     }
    // }

    return (
        <div className="card__container">
            <div className="card">
                {/* eslint-disable-next-line react/prop-types */}
                Title: {post.title} Description {post.description} Image URL {post.image_url}
                {vote}
                <button onClick={increment}>Upvote</button>
                <button onClick={decrement}>Downvote</button>
            </div>
            <div className="edit-delete-buttons-container">
                <button onClick={()=> navigate('/create', {state: {post}})}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};