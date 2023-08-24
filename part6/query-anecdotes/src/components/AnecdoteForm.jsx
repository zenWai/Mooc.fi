import {useMutation, useQueryClient} from "react-query";
import {createAnecdote} from "../requests.js";
import {NotificationContext, SHOW_NOTIFICATION} from "./NotificationContext.jsx";
import {useContext} from "react";

const AnecdoteForm = ({notificationMessageRef}) => {
  const { dispatch } = useContext(NotificationContext);
  const queryClient = useQueryClient()
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      id: '',
      votes: 0
    })
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'] || []);
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({ type: SHOW_NOTIFICATION, payload: `New Anecdote added: ${newAnecdote.content}` });
    },
    onError: (error) => {
      dispatch({ type: SHOW_NOTIFICATION, payload: `ERROR: ${error.message}` });
    }
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote'/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
