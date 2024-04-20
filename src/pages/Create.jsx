import {useState} from "react";
import supabase from "../config/client.js";


export const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image_url, setImageURL] = useState('')
  const [formError, setFormError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !description || !image_url) {
      setFormError(new Error("Please Fill in Fields"))
      return
    }

    const {data, error} = await supabase
      .from("posts")
      .insert([{title, description, image_url}])
      .select()

    if(error){
      console.log(error)
      setFormError("Error in Creating Post")
    }

    if(data){
      console.log(data)
      setTitle("")
      setDescription("")
      setImageURL("")
    }

    console.log(title,description,image_url)

  }

  return <>
  <form onSubmit={handleSubmit}>
    {/* Title */}
    <label htmlFor="title">Title</label>
    <input type="text" id="id" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Title"/>
    {/* Description */}
    <label htmlFor="description">Description</label>
    <input type="text" id="id" value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Content (Optional)"/>
    {/* Image URL (Optional) */}
    <label htmlFor="image_url">Image URL</label>
    <input type="text" id="id" value={image_url} onChange={(e)=> setImageURL(e.target.value)} placeholder="Image URL (Optional)"/>
    <button>Create Post</button>
  </form>
  </>;
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