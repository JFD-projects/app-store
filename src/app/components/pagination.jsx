import React from 'react';

const Pagination = ({ currentPage, countItem, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(countItem / pageSize);
  const pages = pageCount > 1 ? [...Array(pageCount).keys()].map((_) => _ + 1) : [];

  return (
    <nav className='d-flex justify-content-center'>
      <ul className='pagination pagination'>
        {pages.map((page) => (
          <li
            key={page}
            className={'page-item' + (page === currentPage ? ' active' : '')}
            aria-current='page'
            onClick={() => onPageChange(page)}>
            <button className='page-link'>{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
