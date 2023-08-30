import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {fetchUsers} from "../../features/users/usersSlice.js";

const UserDetailsView = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const users = useSelector(state => state.users);

  useEffect(() => {
    if(users.length === 0) {
      dispatch(fetchUsers())
    }
  },[dispatch, users])

  const user = users.find(user => user.id === userID);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Blogs added by {user.name}</h1>
      <ul>
        {user.blogs.map(blog => (
          <ul key={blog.id}> blog: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ul>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailsView;