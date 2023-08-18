const express = require('express')
const morgan = require('morgan');
const app = express();
app.use(express.json());
// Create a new token for body data
morgan.token('bodyData', function (req) {
    return req.body ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyData'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
/*app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id, typeof id, note.id === id)
        return note.id === id
    })
    console.log(note)
    response.json(note)
})*/
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    //404 error
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.delete('/api/persons/name/:name', (request, response) => {
    const name = decodeURI(request.params.name).trim();
    const person = persons.find(person => person.name.toLowerCase() === name.toLowerCase());

    if (person) {
        persons = persons.filter(p => p.name.toLowerCase() !== name.toLowerCase());
        response.status(204).end();
    } else {
        response.status(404).send({ error: 'name not found' });
    }
});

app.get('/info', (req, res) => {
    const currentTime = new Date();
    const numberOfPeople = persons.length;

    const responseHtml = `
        <p>Phonebook has info of ${numberOfPeople} people</p>
        <p>${currentTime}</p>
    `;

    res.send(responseHtml);
});

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    // Check for duplicate name
    const duplicate = persons.find(p => p.name === body.name)
    if (duplicate) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 1000000), // generate a random id
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})