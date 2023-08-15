import {useState} from 'react'

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

const Persons = ({persons}) => {
    return (
        <div>
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-22-28-23'}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const handleInputName = (event) => {
        setNewName(event.target.value);
    }
    const handleInputNumber = (event) => {
        setNewNumber(event.target.value);
    }
    const handleInputFilter = (event) => {
        setNewFilter(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        };
        const nameExists = persons.some(person => person.name === personObject.name);
        if (!nameExists) {
            setPersons(persons.concat(personObject));
        } else {
            window.alert(`${personObject.name} is already added to phonebook`);
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
            <Persons persons={personsWithFilter}/>
        </div>
    )
}

export default App
