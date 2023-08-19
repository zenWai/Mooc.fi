const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
// Create a new token for body data
morgan.token('bodyData', function (req) {
  return req.body ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyData'));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error)); // Passes to the error handling middleware
});
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).send({ error: 'person not found' });
      }
    })
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  const currentTime = new Date();

  Person.countDocuments({})
    .then(numberOfPeople => {
      const responseHtml = `
                <p>Phonebook has info of ${numberOfPeople} people</p>
                <p>${currentTime}</p>
            `;
      res.send(responseHtml);
    }).catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data.');
    });
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(savedPerson => response.status(201).json(savedPerson))
    .catch(error => {
      if (error.name === 'ValidationError') {
        response.status(400).send({ error: error.message });
      } else {
        next(error);
      }
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).end();  // Handle all other errors with a generic 500 status code.
});
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});