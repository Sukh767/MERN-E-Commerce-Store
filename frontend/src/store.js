// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productdetailsReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

// Example reducers (you should replace these with your actual reducers)

// Combine your reducers here
const reducer = {
  productList: productListReducers,
  productDetails: productdetailsReducers,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
// Initial state (can be an empty object or populated as needed)
const initialState = {
  cart: { cartItems: 'hello' },
};

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
