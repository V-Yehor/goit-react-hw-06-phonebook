import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

const localStorageKey = 'contact-List';

export const App = () => {
  const [contacts, setcontacts] = useState(() => {
    const savedContacts = window.localStorage.getItem(localStorageKey);
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    } else {
      return [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
  });
  const [filter, setfilter] = useState('');

  const visibleContacts = contacts.filter(contact => {
    const hasFilteredName = contact.name
      .toLowerCase()
      .includes(filter.toLowerCase());

    return hasFilteredName;
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newConact => {
    const hasName = contacts.some(contact => contact.name === newConact.name);
    if (hasName) {
      alert(`${newConact.name} is already in contacts.`);
      return;
    } else {
      const contact = { ...newConact, id: nanoid() };
      setcontacts(prevState => [...prevState, contact]);
    }
  };

  const setFilter = newSearch => {
    setfilter(newSearch);
  };

  const deleteContact = ContactId => {
    setcontacts(prevState =>
      prevState.filter(contact => contact.id !== ContactId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContact} />

      <h2>Contacts</h2>
      <Filter onSetFilter={setFilter} currentFilter={filter} />
      <ContactList contactInfo={visibleContacts} onDelete={deleteContact} />

      <GlobalStyle />
    </div>
  );
};
