// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productdetailsReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = {
  productList: productListReducers,
  productDetails: productdetailsReducers,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

// const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer,
  preloadedState: initialState, // use preloadedState for initial values
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
