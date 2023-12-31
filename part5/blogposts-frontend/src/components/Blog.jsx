import Togglable from "./Togglable.jsx";
import {useState} from "react";
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, notificationRef}) => {
  const [isHeaderVisible, setHeaderVisibility] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [hasLiked, setHasLiked] = useState(blog.hasLiked);
  const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
  const { id: loggedInUserId } = JSON.parse(loggedInUserJSON) || {};

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '85vw',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const listStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    textAlign: 'left'
  };

  const handleToggle = (isVisible) => {
    setHeaderVisibility(!isVisible);
  }

  const handleLike = async (blogId) => {
    setIsLiking(true);
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (!loggedInUserJSON) {
      console.error('No user data found in local storage');
      return;
    }
    const { token } = JSON.parse(loggedInUserJSON);

    if (!token) {
      console.error('No token found');
      return;
    }

    blogService.setToken(token);
    try {
      const updatedBlog = await blogService.updateLike(blogId);
      console.log(updatedBlog);
      setHasLiked(prevState => !prevState);
      if (hasLiked) {
        setLikes(prevState => setLikes(prevState - 1));
      } else {
        setLikes(prevState => setLikes(prevState + 1));
      }
    } catch (error) {
      console.error('Error liking the blog', error);
    } finally {
      setIsLiking(false);
    }
  }

  const handleDelete = async (blogId) => {
    if (window.confirm("Do you really want to delete this blog?")) {
      try {
        await blogService.remove(blogId);
        // Update the list of blogs after deletion
        const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
        setBlogs(updatedBlogs);
        notificationRef.current.toggleVisibility('Post deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting the blog', error);
      }
    }
  }

  return (
    <div className="blog-parent-div" style={blogStyle}>
      <div style={isHeaderVisible ? headerStyle : {}}>
        <h3 id="blog-titleauthor" className="blog-title-author">{blog.title} By {blog.author}</h3>
        {blog.user && loggedInUserId === blog.user.id && (
          <button id="blog-delete-button" onClick={() => handleDelete(blog.id)}>Delete</button>
        )}
        <Togglable showLabel='View' hideLabel='Hide' onToggle={handleToggle}>
          <ul style={listStyle}>
            <li id="blog-url" className="blog-url">Url: {blog.url}</li>
            <li id="blog-likes" className="blog-likes">Likes: {likes}
              <button id="blog-like-button" onClick={() => handleLike(blog.id)} disabled={isLiking}>
                {isLiking ? 'Loading...' : (hasLiked ? 'Liked' : 'Like')}
              </button>
            </li>
            <li id="blog-created-by">Created by: {blog.user ? blog.user.name : 'Unknown'}</li>
          </ul>
        </Togglable>
      </div>
    </div>
  );
}

export default Blog