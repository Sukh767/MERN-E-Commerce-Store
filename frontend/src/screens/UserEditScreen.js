import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';

const UserEditScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user || !user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Implement the update functionality here
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          user && (  // Add a check to ensure user is defined
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

              <Form.Group controlId="isadmin">
                <Form.Check 
                  type="checkbox" 
                  label="Is Admin" 
                  checked={isAdmin} 
                  onChange={(e) => setIsAdmin(e.target.checked)}  // Handle the checkbox toggle
                />
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

export default UserEditScreen;
