import {useEffect, useState} from 'react'
import personService from './services/PersonsDB.js'
import Notification from "./components/NotificationMessage.jsx";

const Filter = ({value, onChange}) => {
    return (
        <div>
            Filter shown with: <input
            value={value}
            onChange={onChange}
        />
        </div>
    )
}

const PersonForm = ({valueName, onChangeName, valueNumber, onChangeNumber, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input
                value={valueName}
                onChange={onChangeName}
            />
            </div>
            <div>
                number: <input
                value={valueNumber}
                onChange={onChangeNumber}
            />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const DeleteButton = ({person, onDelete}) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this Person?')) {
            personService.deleteById(person.id)
                .then(() => {
                    onDelete(person, 'success')
                })
                .catch(error => {
                    console.log('Error deleting', error)
                    onDelete(person, 'error')
                })
        }
    }
    return (
        <button onClick={handleDelete}>DELETE</button>
    )
}
const Persons = ({persons, onDelete}) => {
    return (
        <div>
            {persons.map(person => <p key={person.name}>
                {person.name} {person.number}
                <DeleteButton person={person} onDelete={onDelete}/>
            </p>)}
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState({message: '', type: ''});
    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
                setNotificationMessage({message: 'Loaded Successfully', type: 'success'});
            })
    }, []);
    const handleInputName = (event) => {
        setNewName(event.target.value);
    }
    const handleInputNumber = (event) => {
        setNewNumber(event.target.value);
    }
    const handleInputFilter = (event) => {
        setNewFilter(event.target.value);
    }
    const handleDelete = (person, status) => {
        const id = person.id;
        if (status === 'success') {
            setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
            setNotificationMessage({message: `Deleted ${person.name} from your PhoneBook successfully`, type: status});
        } else if (status === 'error') {
            setNotificationMessage({message: `Unexpected Error was ${person.name} already deleted?`, type: status});
            personService.getAll()
                .then(response => setPersons(response));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        };
        const existingPerson = persons.find(person => person.name === personObject.name);
        if (!existingPerson) {
            personService.create(personObject)
                .then(person => {
                    setPersons(persons.concat(person))
                    setNotificationMessage({message: `Added ${person.name}`, type: 'success'});
                })
                .catch(error => {
                    console.log(error)
                    setNotificationMessage({message: 'Error creating new contact', type: 'error'})
                });
        } else {
            if (window.confirm(`${personObject.name} is already added to phonebook do you want to update the PhoneNumber?`)) {
                personService.update(existingPerson.id, personObject)
                    .then(updatedPerson => setPersons(
                        persons.map(
                            person => person.id !== existingPerson.id ? person : updatedPerson
                        )
                    ))
                    .catch(error => {
                        console.log(error);
                        setNotificationMessage({message: `Error updating ${personObject.name}`, type: 'error'});
                        personService.getAll().then(response => setPersons(response));
                    })
            }
        }
        setNewName('');
        setNewNumber('');
    }

    const personsWithFilter = persons.filter(person => {
        const nameLowerCase = person.name.toLowerCase();
        const filterLowerCase = newFilter.toLowerCase();
        return nameLowerCase.includes(filterLowerCase);
    })

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage.message} type={notificationMessage.type}/>
            <h3>Filter</h3>
            <Filter value={newFilter} onChange={handleInputFilter}/>
            <h3>Add New</h3>
            <PersonForm
                onChangeName={handleInputName}
                valueName={newName}
                onChangeNumber={handleInputNumber}
                valueNumber={newNumber}
                onSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <Persons persons={personsWithFilter} onDelete={handleDelete}/>
        </div>
    )
}

export default App
