import React, {useState} from 'react';
import Togglable from './Togglable.jsx';
import {useDispatch, useSelector} from "react-redux";
import {createBlog} from "../features/blogs/blogsSlice.js";

const CreatePostForm = ({ createNewFormRef }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreateNew = async event => {

    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
      user: {
        id: user.id,
        name: user.name
      }
    };

    let creatingBlog = await dispatch(createBlog(newBlog));
    if(!creatingBlog.payload){
      console.log(creatingBlog.error.message);
      return;
    }

    createNewFormRef.current.toggleVisibility();
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Togglable showLabel="Create New" hideLabel="Cancel" ref={createNewFormRef}>
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
          <button id="create-form-create-post-button" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </Togglable>
  );
};

export default CreatePostForm;
