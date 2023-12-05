import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreFilter } from '../redux/filterSlice';
import { addNewContact, deleteStoreContact } from '../redux/contactsSlice';

export const App = () => {
  const dispatch = useDispatch();

  const initialContacts = useSelector(state => state.contacts);
  const stateFilter = useSelector(state => state.filter);

  const visibleContacts = initialContacts.filter(contact => {
    const hasFilteredName = contact.name
      .toLowerCase()
      .includes(stateFilter.toLowerCase());

    return hasFilteredName;
  });

  const addContact = value => {
    const hasName = initialContacts.some(
      contact => contact.name === value.name
    );
    if (hasName) {
      alert(`${value.name} is already in contacts.`);
      return;
    } else {
      const action = addNewContact(value);
      dispatch(action);
    }
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
