import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {setNotification} from "../reducers/notificationReducer";
import {voteAnecdote} from "../server/requests";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const selectAnecdotes = state => state.anecdotes;
  const selectFilter = state => state.filter;

  const getFilteredAnecdotes = createSelector(
    [selectAnecdotes, selectFilter],
    (anecdotes, filter) => {
      return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes);
    }
  );
  const anecdotes = useSelector(getFilteredAnecdotes);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification({ message: `You voted for '${anecdote.content}'`, duration: 10}));
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;