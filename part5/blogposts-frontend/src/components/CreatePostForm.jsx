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
    const { id: userId, name: userName} = JSON.parse(loggedInUserJSON) || {};
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    console.log(newBlog)
    try {
      const createdBlog = await blogService.create(newBlog);
      const createdBlogWithAuthorId = {
        ...createdBlog,
        user: {
          id: userId,
          name: userName
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
    <Togglable showLabel='Create New' hideLabel='Cancel' ref={createNewFormRef}>
      <div>
        <h3 id="create-form-title">Create New:</h3>
        <form onSubmit={handleCreateNew}>
          <div>
            title:
            <input
              id="create-form-input-title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="create-form-input-author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              id="create-form-input-url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create-form-create-post-button" type="submit">Create Post</button>
        </form>
      </div>
    </Togglable>
  );
};

export default CreatePostForm;