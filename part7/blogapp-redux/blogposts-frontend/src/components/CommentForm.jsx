import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addCommentToBlog} from "../features/blogs/blogsSlice.js";

const CommentForm = ({ blogID }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = () => {
    console.log(comment);
    console.log(blogID)
    dispatch(addCommentToBlog({ blogID, comment }));
    setComment('');
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </>
  );
};

export default CommentForm;