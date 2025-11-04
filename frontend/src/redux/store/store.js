// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import dealsReducer from "../slices/deals/dealsSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import leadsReducer from "../slices/leads/leadsSlice";
import offeringsReducer from "../slices/offerings/offeringsSlice";
import userReducer from "../slices/userSlice/userSlice"
import userRoleReducer from "../slices/userRoleSlice/userRoleSlice"
import contactReducer from "../slices/contacts/contactSlice"
import accountReducer from "../slices/accounts/accountSlice"
import inventoryReducer from "../slices/inventory/inventorySlice";
import shipmentReducer from "../slices/shipments/shipmentSlice"
import salesReducer from "../slices/sales/SalesOrderSlice"
import packageReducer from "../slices/sales/PackageSlice"
import creditReducer from "../slices/invoices/creditNoteSlice"
import invoiceReducer from "../slices/invoices/invoiceSlice"
import paymentReducer from "../slices/invoices/paymentsSlice"
import referralClientReducer from "../slices/referralClient/referralClientSlice"
// Only persist the user state, and only its "user" key
const userPersistConfig = {

    key: 'user',
    storage,
    whitelist: ['user'], // only persist user
};

const rootReducer = combineReducers({
    leads: leadsReducer,
    offerings: offeringsReducer,
    deals: dealsReducer,
    contacts: contactReducer,
    accounts: accountReducer,
    user: persistReducer(userPersistConfig, userReducer),
    userRoles: userRoleReducer,
    inventory: inventoryReducer,
    shipments: shipmentReducer,
    salesOrders: salesReducer,
    packages: packageReducer,
    invoices: invoiceReducer,
    creditNotes: creditReducer,
    payments: paymentReducer,
    referralClient: referralClientReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

export const persistor = persistStore(store);
