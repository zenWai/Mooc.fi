import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../features/users/usersSlice.js";
import NotificationMessage from "../NotificationMessage.jsx";
import {setBlogsUpdated} from "../../features/blogs/blogsSlice.js";
import {Link} from "react-router-dom";

const UsersView = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  console.log('example:', users);
  const { blogsUpdated } = useSelector(state => state.blogs);
  useEffect(() => {
    if (users.length === 0 || blogsUpdated) {
      dispatch(fetchUsers());
      dispatch(setBlogsUpdated(false)); // Reset the blogsUpdated flag
    }
  }, [dispatch, users]);


  return (
    <div>
      <h1>Users</h1>
      <NotificationMessage/>
      <table>
        <thead>
        <tr>
          <th>User</th>
          <th>Blogs Created</th>
        </tr>
        </thead>
        <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersView;