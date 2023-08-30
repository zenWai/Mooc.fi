import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBlogs} from "../../features/blogs/blogsSlice.js";
import {useParams} from "react-router-dom";
import LikeBlogButton from "../Buttons/LikeBlogButton.jsx";
import DeleteBlogButton from "../Buttons/DeleteBlogButton.jsx";
import CommentForm from "../CommentForm.jsx";

const BlogDetailsView = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const { blogID } = useParams();


  useEffect(() => {
    if (blogs.length === 0) dispatch(fetchBlogs());
  }, [dispatch, blogs]);

  const blog = blogs.find(blog => blog.id === blogID)

  const formattedUrl =
    blog?.url.startsWith('http://') ||
    blog?.url.startsWith('https://') ||
    blog?.url.startsWith('www.')
      ? blog?.url
      : `http://${blog?.url}`;

  const showComments = () => {
    return (
      <>
        {blog?.comments && blog.comments.length > 0 ? (
          <div>
            <h3>Comments</h3>
            <ol>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </>
    )
  };

  return (
    <div>
      <h1>
        <strong>Title:</strong> {blog?.title}
      </h1>
      <h2>
        <strong>author:</strong> {blog?.author}
      </h2>
      <p>url: <a href={formattedUrl} target="_blank" rel="noopener noreferrer">{formattedUrl}</a></p>
      <p>{blog?.likes} likes <LikeBlogButton blog={blog}/></p>
      <p><DeleteBlogButton blog={blog}/></p>
      <p>Blog added by {blog?.user?.name}</p>
      <CommentForm blogID={blogID}/>
      {showComments()}
    </div>
  )
}

export default BlogDetailsView;