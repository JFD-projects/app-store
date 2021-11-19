import React from 'react';
// import PropTypes from 'prop-types';

const SearchProduct = ({ onSearch }) => {
  return (
    <form className='d-flex mb-3'>
      <input
        className='form-control'
        type='search'
        placeholder='Что вы ищете?'
        aria-label='Поиск'
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </form>
  );
};

// SearchProduct.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

export default SearchProduct;
