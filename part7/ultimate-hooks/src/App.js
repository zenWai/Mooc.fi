import {useState, useEffect} from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('');
  }

  return {
    type,
    value,
    onChange,
    reset: reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setResources(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [baseUrl]);

  const create = (resource) => {
    return axios.post(baseUrl, resource)
      .then(response => {
        setResources([...resources, response.data]);
      })
      .catch(err => {
        setError(err.message);
      });
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    name.reset();
    number.reset();
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App