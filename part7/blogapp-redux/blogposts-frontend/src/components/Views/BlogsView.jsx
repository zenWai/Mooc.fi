import NotificationMessage from "../NotificationMessage.jsx";
import CreatePostForm from "../CreatePostForm.jsx";
import Blog from "../Blog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {removeUser} from "../../features/user/userSlice.js";
import {fetchBlogs} from "../../features/blogs/blogsSlice.js";
import authHelpers from "../../helpers/authHelpers.js";

const BlogsView = () => {
  const dispatch = useDispatch();
  const createNewFormRef = useRef();
  const { blogs } = useSelector(state => state.blogs);
  useEffect(() => {
    if (blogs.length === 0) {  // Only fetch if the blogs list is empty
      dispatch(fetchBlogs());
    }
    if (!authHelpers.isUserLoggedIn()) authHelpers.initializeUser()
  }, [blogs, dispatch]);

  return (
    <div>
      <h1>Blogs</h1>
      <NotificationMessage/>
      <CreatePostForm createNewFormRef={createNewFormRef}/>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog}/>
        ))
      }
    </div>
  )
}

export default BlogsView;
