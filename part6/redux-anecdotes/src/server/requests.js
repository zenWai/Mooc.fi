import axios from 'axios'
import {createAsyncThunk} from "@reduxjs/toolkit";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = createAsyncThunk('anecdotes/getAnecdotes', async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});
export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content) => {
    const newAnecdotes = {
      content: content,
      votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdotes);
    return response.data;
  }
);

export const voteAnecdote = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (anecdote) => {
    console.log(anecdote)
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1};
    return (await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)).data;
  }
);