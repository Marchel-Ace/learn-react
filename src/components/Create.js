import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [author, setAuthor] = useState();
    const [isPending, setPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPending(true);
        console.log('here')
        const blog = {title, body, author}
        axios.post('http://localhost:8000/blogs', blog)
        .then(res => {
            setPending(false);
            console.log(res.status)
            history.push('/')
        })
        .catch(err => {
            setPending(false);
            console.log(err)
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                 type="text"
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
                />
                <label>Blog body:</label>
                <textarea
                 value={body}
                 onChange={(e) => setBody(e.target.value)} 
                 required
                 >
                </textarea>
                <label>Blog author:</label>
                <select
                 value={author}
                 onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending ? <button>Add Blog</button> : <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;