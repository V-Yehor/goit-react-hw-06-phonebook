import { Formik } from 'formik';
import {
  FormWrapper,
  FormField,
  FormLabel,
  FormBtn,
} from './ContactForm.styled';

import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addNewContact } from '../../redux/contactsSlice';

const contactsSheme = Yup.object().shape({
  name: Yup.string().required('Required'),
  number: Yup.string().required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const initialContacts = useSelector(state => state.contacts);

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

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={contactsSheme}
      onSubmit={(values, actions) => {
        addContact(values);
        actions.resetForm();
      }}
    >
      <FormWrapper>
        <FormLabel>
          Name
          <FormField name="name" />
        </FormLabel>
        <FormLabel>
          Number
          <FormField name="number" />
        </FormLabel>
        <FormBtn type="submit">Add contact</FormBtn>
      </FormWrapper>
    </Formik>
  );
};
