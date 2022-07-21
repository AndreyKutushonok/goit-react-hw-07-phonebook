import { useSelector } from 'react-redux';
import { useDeleteContactMutation } from 'redux/api';
import { useGetContactsQuery } from 'redux/api';
import { getFilteredContacts, getFilter } from 'redux/selectors';
import s from './ContactList.module.css';

const ContactList = () => {
    const [deleteContact] = useDeleteContactMutation();
    const filter = useSelector(getFilter);
    const { filteredData } = useGetContactsQuery(undefined, {
        selectFromResult(result) {
            return {
                ...result,
                filteredData: getFilteredContacts(result, filter),
            };
        },
    });

    return (
        <ul className={s.contactsList}>
            {filteredData?.map(({ id, name, phone }) => (
                <li className={s.listItem} key={id}>
                    <p className={s.contactText}>
                        {name}: {phone}
                    </p>
                    <button
                        className={s.button}
                        type="submit"
                        name={name}
                        onClick={() => deleteContact(id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
