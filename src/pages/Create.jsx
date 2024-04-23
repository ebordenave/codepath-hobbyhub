import { useState } from "react";
import supabase from "../config/client.js";
import "./Pages.css"
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageURL] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image_url) {
      setFormError(new Error("Please Fill in Fields"));
      return;
    }

    const uuid = uuidv4();

    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, description, image_url, uuid }])
      .select();

    if (error) {
      console.log(error);
      setFormError("Error in Creating FeedPostSnippet");
    }

    if (data) {
      console.log(data);
      setTitle("");
      setDescription("");
      setImageURL("");
      navigate(`/post/${uuid}`);
    }

    console.log(title, description, image_url, uuid);
  };

  return (
    <>
      <div className="create_wrapper">
        <div className="create_container">
          <form onSubmit={handleSubmit}>
            <div className="input-title">
              {/* Title */}
              {/*<label htmlFor="title">Title</label>*/}
              <input
                type="text"
                id="id"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="input-image-url">
              {/* Image URL (Optional) */}
              {/*<label htmlFor="image_url">Image URL</label>*/}
              <input
                type="text"
                id="id"
                value={image_url}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Image URL (Optional)"
              />
            </div>
            <div className="textarea-description">
              <textarea
                id="textarea"
                name="content"
                placeholder="Content (Optional)"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button>Create Post</button>
          </form>
        </div>
      </div>
    </>
  );
};

//
// const { data, error } = await supabase
//   .from("cards")
//   .insert([
//     {
//       card_title,
//       converted_mana_cost,
//       abilities_text,
//       flavor_text,
//       card_type,
//       card_toughness,
//       card_power,
//       card_subtype,
//     },
//   ])
//   .select();
//
// if (error) {
//   console.log("‼️" + error);
//   setFormError("Please fill in all fields");
// }
//
// if (data) {
//   console.log("🎉" + data);
//   setFormError(null);
//   navigate("/");
// }