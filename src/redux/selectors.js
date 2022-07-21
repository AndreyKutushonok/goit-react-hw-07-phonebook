import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter.toLowerCase();

export const getFilteredContacts = createSelector(
    [response => response.data, (_, filter) => filter],

    (contacts, filter) => {
        return (
            contacts?.filter(contact =>
                contact.name.toLowerCase().startsWith(filter)
            ) ?? []
        );
    }
);
