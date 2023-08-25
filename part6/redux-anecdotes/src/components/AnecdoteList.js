import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {addVoteAction} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const getAnecdotes = state => state.anecdotes;
  const getFilter = state => state.filter;

  const getFilteredAnecdotes = createSelector(
    [getAnecdotes, getFilter],
    (anecdotes, filter) => {
      return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes);
    }
  );
  const anecdotes = useSelector(getFilteredAnecdotes);

  const vote = (id, content) => {
    dispatch(addVoteAction(id));
    dispatch(setNotification(`You voted for '${content}'`));
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;