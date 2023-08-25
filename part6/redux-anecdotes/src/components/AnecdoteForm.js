import {useDispatch} from "react-redux";
import {setNotification} from "../reducers/notificationReducer";
import {createAnecdote} from "../server/requests";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  // combine into a single
  const addWithNotification = (content) => dispatch => {
    console.log('content',content)
    dispatch(createAnecdote(content));
    dispatch(setNotification({ message: `New Anecdote added: '${content}'`, duration: 10 }));
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