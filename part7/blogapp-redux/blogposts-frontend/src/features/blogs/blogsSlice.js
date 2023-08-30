import blogService from '../../services/blogs.js';
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  return await blogService.getAll();
})

export const createBlog = createAsyncThunk('blogs/createBlog', async (newBlog) => {
  return await blogService.create(newBlog);
})

export const updateBlogLikes = createAsyncThunk('blogs/updateBlogLikes', async (blogId) => {

  const updatedBlog = await blogService.updateLike(blogId);
  return updatedBlog;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
  await blogService.remove(blogId);
  return blogId; // Return the blogId so that we know which blog to remove from state
});

export const addCommentToBlog = createAsyncThunk('blogs/addCommentToBlog', async ({ blogID, comment }) => {
  return await blogService.addComment(blogID, comment);
});

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    blogsUpdated: false,
  },
  reducers: {
    setBlogsUpdated: (state, action) => {
      state.blogsUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.blogsUpdated = true;
      })
      .addCase(updateBlogLikes.fulfilled, (state, action) => {
        const blogToUpdate = state.blogs.find(blog => blog.id === action.payload.id);
        if (blogToUpdate) {
          blogToUpdate.likes = action.payload.likes;
          blogToUpdate.likedBy = action.payload.likedBy;
          blogToUpdate.hasLiked = action.payload.hasLiked;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        // Remove the blog from state
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      })
      .addCase(addCommentToBlog.fulfilled, (state, action) => {
        // Find the blog to which the comment is added
        const blogToUpdate = state.blogs.find(blog => blog.id === action.payload.id);
        if (blogToUpdate) {
          blogToUpdate.comments = action.payload.comments;
        }
      });
  }
})

export const { setBlogsUpdated } = blogsSlice.actions;
export default blogsSlice.reducer;