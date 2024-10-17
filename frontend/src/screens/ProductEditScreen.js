import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {listProductDetails} from '../actions/productActions'

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [countInstock, setCountInstock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [reviews, setReviews] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;


  useEffect(() => {
    
      if (!product || !product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setDescription(product.description);
        setCategory(product.category);
        setRating(product.rating);
        setCountInstock(product.countInstock);
        setNumReviews(product.numReviews);
        setReviews(product.reviews);
      }
  }, [dispatch, id, product, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    //update product
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          product && ( // Add a check to ensure user is defined
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

              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand Name"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInstock">
              <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product stock"
                  value={countInstock}
                  onChange={(e) => setCountInstock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="numReviews">
              <Form.Label>Number of Reviews</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Product numReviews"
                  value={numReviews}
                  onChange={(e) => setNumReviews(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="reviews">
              <Form.Label>Number of Reviews</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Reviews"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                className="primary"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '10px',
                  marginBottom: '15px',
                }}
              >
                Update
              </Button>
            </Form>
          )
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
