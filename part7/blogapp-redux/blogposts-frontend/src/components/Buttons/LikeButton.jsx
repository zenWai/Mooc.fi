import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useState} from "react";
import {useDispatch} from "react-redux";
import authHelper from "../../helpers/authHelpers.js";
import {updateBlogLikes} from "../../features/blogs/blogsSlice.js";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const LikeButton = ({blog}) => {
  const [isLiking, setIsLiking] = useState(false);
  const dispatch = useDispatch();
  const handleLike = async blogId => {
    setIsLiking(true);
    if (!authHelper.isUserLoggedIn()) return;
    await dispatch(updateBlogLikes(blogId));
    setIsLiking(false);
  };

  const iconSelect = () => {
    if (blog.hasLiked) {
      return <ThumbUpIcon />;
    } else {
      return <ThumbUpOutlinedIcon />;
    }
  };
  if(!blog) return null;
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        startIcon={iconSelect()}
        onClick={() => handleLike(blog?.id)}
        disabled={isLiking}
      >
        {isLiking ? 'Loading...' : blog?.hasLiked ? 'Liked' : 'Like'}
      </Button>
    </Stack>
  );
}

export default LikeButton;