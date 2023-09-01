import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries";
import {useEffect, useState} from "react";

const Authors = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor, changeAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (changeAuthor.data && changeAuthor.data.editAuthor === null) {
      setErrorMessage('person not found')
    }
    // default select to the first author
    if (result.data && result.data.allAuthors) {
      setName(result.data.allAuthors[0]?.name || '');
    }
  }, [changeAuthor.data, result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name,
        setBornTo: parseInt(born, 10)
      },
    })
      .then(() => {
        setName('');
        setBorn('');
      })
      .catch(error => {
        console.error('There was an error editing the author:', error);
        setErrorMessage(error.message);
      });
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  if (result.error) {
    setErrorMessage(result.error.message);
    return <div>Error: {errorMessage}</div>;
  }
  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
