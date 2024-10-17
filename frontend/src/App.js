import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/order/:id" Component={OrderScreen} />
            <Route path="/shipping" Component={ShippingScreen} />
            <Route path="/payment" Component={PaymentScreen} />
            <Route path="/placeorder" Component={PlaceOrderScreen} />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/product/:id" Component={ProductScreen} />
            <Route path="/cart/:id?" Component={CartScreen} />
            <Route path='/admin/userlist' Component={UserListScreen}/>
            <Route path='/admin/productlist' Component={ProductListScreen}/>
            <Route path='/admin/users/:id/edit' Component={UserEditScreen}/>
            <Route path='/admin/product/:id/edit' Component={ProductEditScreen}/>
            <Route path="/" Component={HomeScreen} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
