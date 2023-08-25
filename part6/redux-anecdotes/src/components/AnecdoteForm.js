import {useDispatch} from "react-redux";
import {addAnecdoteAction} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  // combine into a single
  const addWithNotification = (content) => dispatch => {
    dispatch(addAnecdoteAction(content));
    dispatch(setNotification(`New Anecdote added: '${content}'`));
  }
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.Anecdote.value;
    event.target.Anecdote.value = '';
    dispatch(addWithNotification(content));
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