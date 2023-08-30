import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {fetchUsers} from "../../features/users/usersSlice.js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {fetchBlogs} from "../../features/blogs/blogsSlice.js";
import LikeButton from "./../Buttons/LikeButton.jsx";

const UserDetailsView = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const users = useSelector(state => state.users);
  const {blogs} = useSelector(state => state.blogs);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
    if (blogs.length === 0) {
      dispatch(fetchBlogs())
    }
  }, [dispatch, users, blogs])

  const user = users.find(user => user.id === userID);

  if (!user || !blogs) {
    return null;
  }
  const generateUserIndexMap = (blogs) => {
    console.log(blogs);
    const uniqueUserIds = [...new Set(blogs?.map((blog) => {
      if (blog && blog.user) {
        return blog.user.id;
      }
      return undefined;
    }).filter(id => id !== undefined))];
    const userIndexMap = {};

    uniqueUserIds.forEach((id, index) => {
      userIndexMap[id] = index;
    });

    return userIndexMap;
  };
  const userIndexMap = generateUserIndexMap(blogs);
  console.log(user.blogs);
  return (
    <>
      <h1>Blogs added by {user?.name}</h1>
      <List dense sx={{ width: '88vh', bgcolor: '9c27b0' }}>
        {user?.blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            const userIndex = userIndexMap[userID];
            return (
              <ListItem
                key={blog?.id}
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
                    id={blog.id}
                    primary={
                      <>
                        <Link to={`/blogs/${blog.id}`}>
                          {`Title: ${blog.title}`}
                        </Link>
                        {" By author "}
                        {blog.author}
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
};

export default UserDetailsView;