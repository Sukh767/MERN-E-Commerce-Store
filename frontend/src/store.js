// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk';
// eslint-disable-next-line
// import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productCreateReducers,
  productListReducers,
  productReviewCreateReducers,
  productTopRatedReducers,
  productUpdateReducers,
  productdeleteReducers,
  productdetailsReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userDeleteReducers,
  userDetailsReducers,
  userListReducers,
  userLoginReducers,
  userRegisterReducers,
  userUpdateProfileReducers,
  userUpdateReducers,
} from './reducers/userReducers';
import {
  orderCreateReducers,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducers,
  orderListReducers,
  orderPayReducer,
} from './reducers/orderReducers';

const reducer = {
  productList: productListReducers,
  productDetails: productdetailsReducers,
  productDelete: productdeleteReducers,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  productReviewCreate: productReviewCreateReducers,
  productTopRated: productTopRatedReducers,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducers,
  orderList: orderListReducers,
};

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

// const middleware = [thunk];

// Configure the store
const store = configureStore({
  reducer,
  preloadedState: initialState, // use preloadedState for initial values
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
