import { useState } from 'react';
import { nanoid } from 'nanoid';

import MyContactsForm from './MyContactsForm/MyContactsForm';
import MyContactList from './MyContactsList/MyContactsList';
import MyContactsFind from './MyContactsFind/MyContactsFind';
import useLocalStorage from 'hooks/useLocalStorage';

import css from './MyContacts.module.css';

const MyContacts = () => {
  const [contacts, setContacts] = useLocalStorage('my-contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already exist`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFind = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFind = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFind);
    });

    return result;
  };

  const peoples = getFilteredContacts();
  const isContacts = Boolean(peoples.length);

  return (
    <div className={css.wrapper}>
      <div className={css.block}>
        <h3 className={css.title}>Phonebook</h3>
        <MyContactsForm onSubmit={addContact} />
      </div>

      <div className={css.block}>
        <h3 className={css.title}>Contacts</h3>
        <MyContactsFind handleChange={handleFind} />
        {isContacts && (
          <MyContactList removeContact={removeContact} contacts={peoples} />
        )}
        {!isContacts && <p>No contacts in the list</p>}
        <MyContactList removeContact={removeContact} />
      </div>
    </div>
  );
};

export default MyContacts;
