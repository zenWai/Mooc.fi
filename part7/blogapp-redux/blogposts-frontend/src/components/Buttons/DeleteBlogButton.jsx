import {deleteBlog} from "../../features/blogs/blogsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const DeleteBlogButton = ({blog}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleDelete = async blogId => {
    if (window.confirm('Do you really want to delete this blog?')) {
      dispatch(deleteBlog(blogId));
    }
  };

  return (
    blog?.user && user?.id === blog?.user?.id && (
      <button id="blog-delete-button" onClick={() => handleDelete(blog?.id)}>
        Delete
      </button>
    )
  )
}

export default DeleteBlogButton;