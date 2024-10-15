import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal'); //Default payment method PayPal

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        <Col>
        <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentmethod"
            value="PayPal"
            checked={paymentMethod === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mb-3 d-flex align-items-center"
            style={{ gap: '0.5rem' }}
          />
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentmethod"
            value="Stripe"
            checked={paymentMethod === 'Stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="d-flex align-items-center"
            style={{ gap: '0.5rem' }}
          />
        </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-4">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
