// import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreFilter } from 'redux/filterSlice';
import { addNewContact, deleteStoreContact } from 'redux/contactsSlice';

// const localStorageKey = 'contact-List';

export const App = () => {
  const dispatch = useDispatch();

  const initialContacts = useSelector(state => state.contacts);
  const stateFilter = useSelector(state => state.filter);

  // change
  // const [contacts, setcontacts] = useState(() => {
  //   const savedContacts = window.localStorage.getItem(localStorageKey);
  //   if (savedContacts !== null) {
  //     return JSON.parse(savedContacts);
  //   } else {
  //     return initialContacts;
  //   }
  // });

  const visibleContacts = initialContacts.filter(contact => {
    const hasFilteredName = contact.name
      .toLowerCase()
      .includes(stateFilter.toLowerCase());

    return hasFilteredName;
  });

  // change
  // useEffect(() => {
  //   window.localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  // }, [contacts]);

  const addContact = value => {
    const action = addNewContact(value);
    dispatch(action);
  };

  const setFilter = newSearch => {
    const action = setStoreFilter(newSearch);
    dispatch(action);
  };

  const deleteContact = contactId => {
    const action = deleteStoreContact(contactId);
    dispatch(action);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addContact} />

      <h2>Contacts</h2>
      <Filter onSetFilter={setFilter} currentFilter={stateFilter} />
      <ContactList contactInfo={visibleContacts} onDelete={deleteContact} />

      <GlobalStyle />
    </div>
  );
};
