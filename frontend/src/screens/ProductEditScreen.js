import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link,
  useNavigate,
  // eslint-disable-next-line no-unused-vars
  useSearchParams,
  useParams,
} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import FormContainer from '../components/FormContainer.js';
import {
  listProductDetails,
  updateProduct,
} from '../actions/productActions.js';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js';
import { API_URL } from '../config.js';
const ProductEditScreen = () => {
  const params = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productId = params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, product, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        image,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label className='my-2'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label className='my-2'>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label className='my-2'>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.Control
                id='image-file'
                label='Choose File'
                type='file'
                custom
                onChange={uploadFileHandler}></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label className='my-2'>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label className='my-2'>CountInStock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter CountInStock'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label className='my-2'>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label className='my-2'>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
