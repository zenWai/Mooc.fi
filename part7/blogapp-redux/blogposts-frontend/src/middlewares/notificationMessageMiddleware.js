import {setUser, removeUser} from '../features/user/userSlice.js';
import {fetchBlogs, createBlog, updateBlogLikes, deleteBlog} from '../features/blogs/blogsSlice.js'
import {showNotificationMessage} from '../features/notifications/notificationMessageSlice.js';

const notificationMessageMiddleware = store => next => action => {
  next(action);
  const currentState = store.getState();

  const messages = {
    welcome: { message: 'Welcome!', type: 'success' },
    logOut: { message: 'User logged out', type: 'success' },
    noBlogs: { message: 'You have no blogs, start adding some!', type: 'error' },
    blogCreated: (blogName, blogAuthor) => ({
      message: `Blog "${blogName}" by ${blogAuthor} created`,
      type: 'success'
    }),
    blogLiked: (blogUpdated, actionTaken) => ({
      message: `You ${actionTaken} "${blogUpdated}"`, type: 'success'
    }),
    blogDeleted: { message: `Blog has been deleted`, type: 'success' }
  }

  switch (action.type) {
    case setUser.type:
      store.dispatch(showNotificationMessage(messages.welcome));
      break;

    case removeUser.type:
      if (currentState.user) {
        store.dispatch(showNotificationMessage(messages.logOut));
      }
      break;

    case fetchBlogs.fulfilled.type:
      if (action.payload.length === 0) {
        store.dispatch(showNotificationMessage(messages.noBlogs));
      }
      break;

    case createBlog.fulfilled.type:
      const blogName = action.payload.title;
      const blogAuthor = action.payload.author;
      const messageNewBlog = messages.blogCreated(blogName, blogAuthor);
      store.dispatch(showNotificationMessage(messageNewBlog));
      break;

    case updateBlogLikes.fulfilled.type:
      const blogUpdated = action.payload.title;
      const actionTaken = action.payload.hasLiked ? 'liked' : 'disliked';
      const messageBlogLiked = messages.blogLiked(blogUpdated, actionTaken);
      store.dispatch(showNotificationMessage(messageBlogLiked));
      break;

    case deleteBlog.fulfilled.type:
      store.dispatch(showNotificationMessage(messages.blogDeleted));
      break;

    default:
      break;
  }
};

export default notificationMessageMiddleware;