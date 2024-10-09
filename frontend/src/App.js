import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from "./component/Footer";
import Header from "./component/Header";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';

const App =() =>{
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path='/' Component={HomeScreen} exact/>
            <Route path='/product/:id' Component={ProductScreen}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
