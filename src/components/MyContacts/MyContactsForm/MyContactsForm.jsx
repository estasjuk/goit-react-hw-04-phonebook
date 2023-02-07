import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './MyContactsForm.module.css';

const MyContactsForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const { name, number } = state;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setState({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter a name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <label>Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="Enter a phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default MyContactsForm;

MyContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
