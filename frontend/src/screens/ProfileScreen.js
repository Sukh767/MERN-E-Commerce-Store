import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;


  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name) { // Check if user exists
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);  
  

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage('Passwords do not match')
    }else{
     dispatch(updateUserProfile({id: user._id,name,email,password}))// DISPATCH UPDATE PROFILE
    }
  };

  return <Row>
    <Col md={3}>
    <h2>User Profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          style={{
            padding: '10px',
            marginTop: '10px',
            marginBottom: '15px',
          }}
        >
          Update
        </Button>
      </Form>
    </Col>
    <Col md={9}>
    <h2>My Orders</h2>
    {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>:(
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>${order.totalPrice}</td>
              <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                <i className='fas fa-times' style={{color: 'red'}}></i>
              )}</td>
              <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                <i className='fas fa-times' style={{color: 'red'}}></i>
              )}</td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className='btn-sm' variant='light'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
    </Col>
  </Row>
};

export default ProfileScreen;
