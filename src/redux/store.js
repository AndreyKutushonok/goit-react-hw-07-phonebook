import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './api';
import { contactFilter } from './slice';

export const store = configureStore({
    reducer: {
        [contactsApi.reducerPath]: contactsApi.reducer,
        [contactFilter.name]: contactFilter.reducer,
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        contactsApi.middleware,
    ],
});
