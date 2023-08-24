import AnecdoteForm from './components/AnecdoteForm'
import {getAnecdotes, updateAnecdote} from "./requests.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useContext, useRef} from "react";
import Notification from "./components/NotificationMessage.jsx";
import {NotificationContext, SHOW_NOTIFICATION} from "./components/NotificationContext.jsx";

const App = () => {
  const notificationMessageRef = useRef({ message: 'welcome', type: 'success' });
  const { dispatch } = useContext(NotificationContext);

  const queryClient = useQueryClient()
  const data = useQuery({
    queryKey: 'anecdotes',
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,

    onSuccess: (anecdote) => {
      queryClient.invalidateQueries(['anecdotes'] || []);
      console.log(anecdote);
      dispatch({ type: SHOW_NOTIFICATION, payload: `Successfully voted on ${anecdote.content} now has ${anecdote.votes} votes` });
    },

    onError: (error) => {
      dispatch({ type: SHOW_NOTIFICATION, payload: `ERROR: ${error.message}` });
    }
  })

  console.log(JSON.parse(JSON.stringify(data)));
  if (data.isLoading) return <div>Loading....</div>
  if (data.isError) return <div>Anecdote service not available due to problems in server</div>
  const anecdotes = data.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm notificationMessageRef={notificationMessageRef}/>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
