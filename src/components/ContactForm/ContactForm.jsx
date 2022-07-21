import { useState } from 'react';
import { useGetContactsQuery, useAddContactMutation } from 'redux/api';
import s from './ContactForm.module.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const { data } = useGetContactsQuery();
    const [addContact] = useAddContactMutation();

    const handleSubmit = e => {
        e.preventDefault();

        data.some(contact => contact.name === name)
            ? alert(`${name} is already in contacts`)
            : addContact({
                  name: name,
                  phone: number,
              });

        setName('');
        setNumber('');
    };

    const changeText = e => {
        const { name, value } = e.target;

        name === 'name' ? setName(value) : setNumber(value);
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <span className={s.name}>Name</span>
            <label>
                <input
                    onChange={changeText}
                    value={name}
                    className={s.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <span className={s.name}>Number</span>
            <label>
                <input
                    className={s.input}
                    onChange={changeText}
                    value={number}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={s.button} type="submit">
                Add contact
            </button>
        </form>
    );
};

export default ContactForm;
