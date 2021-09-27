import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.filter} onChange={props.tapahtumaKas} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.tapahtumaKasAdd}>
      <div>
        name:
        <input value={props.name} onChange={props.tapahtumaKas} />
      </div>
      <div>
        number:
        <input value={props.number} onChange={props.tapahtumaKasNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    props.filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}
      <button onClick={() => props.click(person.id)}>delete</button></p>)
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteringName, setFilteringName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilteringName(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const containsName = (person) => person.name !== newName
  const filteredPersons = persons.filter(person => person.name.includes(filteringName))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.every(containsName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then(returned => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returned))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${person.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Ìnformation of ${person.name} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
          })
      }
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${person.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Ìnformation of ${person.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter filter={filteringName} tapahtumaKas={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        name={newName}
        number={newNumber} tapahtumaKasAdd={addPerson}
        tapahtumaKas={handleNameChange}
        tapahtumaKasNum={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} click={deletePerson} />

    </div>

  )

}

export default App