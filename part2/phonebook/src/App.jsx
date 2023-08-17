import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonsService from "./services/persons";
import Notification from "./components/Notification";
import "./main.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState(null);
  useEffect(() => {
    PersonsService.getAll().then((initialPersons) =>
      setPersons(initialPersons)
    );
  }, []);

  const update = (newName, newNumber) => {
    const person = persons.find((p) => p.name == newName);
    console.log(person);
    if (
      window.confirm(
        `${person.name} is already added to the phonebook, replace ethe old number with the new one?`
      )
    ) {
      const updatedPerson = { ...person, number: newNumber };
      PersonsService.update(person.id, updatedPerson)
        .then((response) => {
          setPersons(persons.map((p) => (p.id != person.id ? p : response)));
          setNotificationClass("success");
          setNotificationMessage("Changed " + response.name);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage(
            `Information of '${updatedPerson.name}' was already removed from server`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.name !== newName));
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const even = (element) => element.name == newName;

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    persons.some(even)
      ? update(newName, newNumber)
      : PersonsService.create(personObject)
          .then((response) => {
            setPersons(persons.concat(response));
            setNotificationClass("success");
            setNotificationMessage("Added " + response.name);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage(error.response.data.error);
            setNotificationClass("error");
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const personsToShown =
    filter == ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} clase={notificationClass} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShown={personsToShown}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setNotificationClass={setNotificationClass}
      />
    </div>
  );
};

export default App;
