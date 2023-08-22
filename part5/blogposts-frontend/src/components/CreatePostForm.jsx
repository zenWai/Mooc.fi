import React from 'react';
import Togglable from "./Togglable.jsx";
import blogService from '../services/blogs'

const CreatePostForm = ({
                          title,
                          setTitle,
                          author,
                          setAuthor,
                          url,
                          setUrl,
                          blogs,
                          setBlogs,
                          notificationRef,
                          createNewFormRef
                        }) => {

  const handleCreateNew = async (event) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    const { id: userId } = JSON.parse(loggedInUserJSON) || {};
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    try {
      const createdBlog = await blogService.create(newBlog);
      const createdBlogWithAuthorId = {
        ...createdBlog,
        user: {
          id: userId,  // or `decodedToken.id` if you're passing the token
          // add any other properties of the user you might need, if any
        }
      };
      setBlogs([...blogs, createdBlogWithAuthorId]);
      notificationRef.current.toggleVisibility(`${title} by ${author} added`, 'success');
      // hides after Create
      createNewFormRef.current.toggleVisibility();
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      notificationRef.current.toggleVisibility('Error creating blog', 'error');
    }
  };

  return (
    <Togglable showLabel='Create Post' hideLabel='Cancel' ref={createNewFormRef}>
      <div>
        <h3>Create New:</h3>
        <form onSubmit={handleCreateNew}>
          <div>
            title:
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default CreatePostForm;