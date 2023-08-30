import notificationMessageReducer from '../features/notifications/notificationMessageSlice.js';
import blogsReducer from '../features/blogs/blogsSlice.js';
import userReducer from '../features/user/userSlice.js';
import usersReducer from '../features/users/usersSlice.js';

const rootReducer = {
  notificationMessage: notificationMessageReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer,
};

export default rootReducer;