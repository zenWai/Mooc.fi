import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {fetchBlogs} from "../features/blogs/blogsSlice.js";
import authHelpers from "../helpers/authHelpers.js";
import NotificationMessage from "./NotificationMessage.jsx";
import CreatePostForm from "./CreatePostForm.jsx";
import {Link} from "react-router-dom";
import LikeButton from "./Buttons/LikeButton.jsx";

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);
  const dispatch = useDispatch();
  const createNewFormRef = useRef();
  const { blogs } = useSelector(state => state.blogs);
  useEffect(() => {
    if (blogs.length === 0) {  // Only fetch if the blogs list is empty
      dispatch(fetchBlogs());
    }
    if (!authHelpers.isUserLoggedIn()) authHelpers.initializeUser()
  }, [blogs, dispatch]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // for pictures, will get unique index for each user
  const generateUserIndexMap = (blogs) => {
    const uniqueUserIds = [...new Set(blogs.map((blog) => blog.user.id))];
    const userIndexMap = {};

    uniqueUserIds.forEach((id, index) => {
      userIndexMap[id] = index;
    });

    return userIndexMap;
  };
  const userIndexMap = generateUserIndexMap(blogs);

  return (
    <>
      <NotificationMessage/>
      <h1>Blogs</h1>
      <CreatePostForm createNewFormRef={createNewFormRef}/>
      <List dense sx={{ width: '88vh', bgcolor: '9c27b0' }}>

        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            const userIndex = userIndexMap[blog?.user?.id];
            return (
              <ListItem
                key={blog?.id}
                secondaryAction={<LikeButton blog={blog}/>}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${userIndex}`}
                      src={`https://xsgames.co/randomusers/assets/avatars/male/${userIndex}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={blog?.id}
                    primary={
                      <>
                        <Link to={`/blogs/${blog?.id}`}>
                          {blog?.title}
                        </Link>
                        {" has "}
                        {blog?.likes}
                        {" likes"}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>

            );
          })}
      </List>
    </>
  );
}