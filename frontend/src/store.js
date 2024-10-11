// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productdetailsReducers,
} from './reducers/productReducers';

// Example reducers (you should replace these with your actual reducers)

// Combine your reducers here
const reducer = {
  productList: productListReducers,
  productDetails: productdetailsReducers,
};

// Initial state (can be an empty object or populated as needed)
const initialState = {};

// Middleware setup (thunk is included by default in configureStore)
const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: composeWithDevTools(), // You can optionally enable devtools
});

export default store;
