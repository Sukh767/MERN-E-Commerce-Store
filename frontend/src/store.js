// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productdetailsReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers } from './reducers/userReducers';

const reducer = {
  productList: productListReducers,
  productDetails: productdetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {userInfo: userInfoFromStorage}
};

// const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer,
  preloadedState: initialState, // use preloadedState for initial values
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
