import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // Calculate prices without mutating the order state
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = order?.orderItems
    ? addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
      )
    : 0;

  const shippingPrice = order?.shippingPrice
    ? addDecimals(order.shippingPrice)
    : 0;
  const taxPrice = order?.taxPrice ? addDecimals(order.taxPrice) : 0;
  const totalPrice = order?.totalPrice ? addDecimals(order.totalPrice) : 0;

  useEffect(() => {
    const addPayPalScript = async () => {
      const {data: clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    
    if(!order || successPay){
      dispatch({type: ORDER_PAY_RESET})
      dispatch(getOrderDetails(id));
    }else if(!order.isPaid){
      if(!window.paypal){
        addPayPalScript()
      }else{
        setSdkReady(true)
      }
    }
   
  }, [dispatch, id,successPay,order,sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(id,paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                  {!sdkReady ? <Loader/> : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
