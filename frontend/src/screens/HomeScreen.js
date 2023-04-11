import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.js';
import Message from '../components/Message.js';
import Meta from '../components/Meta.js';
import Paginate from '../components/Paginate.js';
import Loader from '../components/Loader.js';
import { listProducts } from '../actions/productActions.js';
import ProductCarousel from '../components/ProductCarousel.js';

const HomeScreen = () => {
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = +params.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
