import { useState } from 'react'
import {useMutation} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CREATE_BOOK} from "../queries";
import {updateCache} from "../App";

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_GENRES } ],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
    },
    update: (cache, response) => {
      console.log('response', response)
      updateCache(cache, { query: ALL_BOOKS }, response.data.bookAdded);
    },
  })

  const submit = async (event) => {

    event.preventDefault()
    createBook({
      variables: {
        title,
        author,
        published: parseInt(published, 10),
        genres
      },
    })
      .then(( data ) => {console.log('book added', data)})
      .catch(( error) => {console.log('error', error)})
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook