import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Meta from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  // fetch products from the database
  // useEffect -> a useEffect hook makes a request to the backend,
  // and whatever is inside useEffect runs as soon as the component loads.

  const { keyword } = useParams();
  const { pageNumber }  = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);

  return (
    <>
      <Meta/>
      {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  );
};

export default HomeScreen;
