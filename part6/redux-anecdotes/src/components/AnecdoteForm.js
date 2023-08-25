import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.Anecdote.value;
    event.target.Anecdote.value = '';
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="Anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm