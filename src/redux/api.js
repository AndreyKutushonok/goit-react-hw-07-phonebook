import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62d658ac15ad24cbf2d4e6f5.mockapi.io/',
    }),
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => `/contacts`,
            providesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: contactId => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
        addContact: builder.mutation({
            query: newContact => ({
                url: '/contacts',
                method: 'POST',
                body: {
                    name: newContact.name,
                    phone: newContact.phone,
                },
            }),
            invalidatesTags: ['Contacts'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useDeleteContactMutation,
    useAddContactMutation,
} = contactsApi;
