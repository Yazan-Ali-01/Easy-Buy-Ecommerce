import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((pageNumber) => (
          <LinkContainer
            key={pageNumber + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${pageNumber + 1}`
                  : `/page/${pageNumber + 1}`
                : `/admin/productlist/${pageNumber + 1}`
            }>
            <Pagination.Item active={pageNumber + 1 === page}>
              {pageNumber + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
