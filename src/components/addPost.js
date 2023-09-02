import { useState } from "react";

export default function AddPost(props){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPost(title, body);
        setTitle('');
        setBody("")
    }   

    return(
        <form onSubmit={handleSubmit}>
            <h2>Add new post</h2>
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <input name="title" type="text" value={title} 
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="body">body</label>
                <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-submit">
                Add post
            </button>
        </form>
    )
} 