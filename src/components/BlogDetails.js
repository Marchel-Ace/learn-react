import axios from "axios";
import { useHistory, useParams } from "react-router";
import useFetch from "../hooks/useFetch";



const BlogDetails = () => {
    const { id } = useParams();
    const {data: blog, isPending, error} = useFetch("http://localhost:8000/blogs/" + id)
    const history = useHistory()
    const handleClick = () => {
        axios.delete("http://localhost:8000/blogs/"+id)
        .then(res => {
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;