import {createSlice} from "@reduxjs/toolkit";
import {createAnecdote, getAnecdotes, voteAnecdote} from "../server/requests";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAnecdotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteAnecdote.fulfilled, (state, action) => {
        const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload.id);
        if (anecdoteToUpdate) {
          console.log(anecdoteToUpdate);
          anecdoteToUpdate.votes = action.payload.votes;
        }
      });
  },
});
export default anecdoteSlice.reducer;