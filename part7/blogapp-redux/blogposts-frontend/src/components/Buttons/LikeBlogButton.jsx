import authHelper from "../../helpers/authHelpers.js";
import {updateBlogLikes} from "../../features/blogs/blogsSlice.js";
import {useState} from "react";
import {useDispatch} from "react-redux";

const LikeBlogButton = ({blog}) => {
  const [isLiking, setIsLiking] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async blogId => {
    setIsLiking(true);
    if (!authHelper.isUserLoggedIn()) return;
    await dispatch(updateBlogLikes(blogId));
    setIsLiking(false);
  };

  return (
    <button
      id="blog-like-button"
      onClick={() => handleLike(blog?.id)}
      disabled={isLiking}
    >
      {isLiking ? 'Loading...' : blog?.hasLiked ? 'Liked' : 'Like'}
    </button>
  )
}

export default LikeBlogButton;