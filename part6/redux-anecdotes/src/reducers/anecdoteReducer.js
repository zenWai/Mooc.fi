const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Action Types
const ADD_VOTE = 'ADD_VOTE';
const ADD_ANECDOTE = 'ADD_ANECDOTE';

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)



export const createAnecdote = content => ({ type: 'ADD_ANECDOTE', content });
export const addVote = id => ({ type: 'ADD_VOTE', id });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VOTE:
      return state.map(anecdote => anecdote.id !== action.id
        ? anecdote
        : { ...anecdote, votes: anecdote.votes + 1 }
      )
    case ADD_ANECDOTE:
      console.log('state now: ', state)
      console.log('action', action)
      return [...state, asObject(action.content)]
    default:
      console.log('state now: ', state)
      console.log('action', action)
      return state
  }
}

export default reducer