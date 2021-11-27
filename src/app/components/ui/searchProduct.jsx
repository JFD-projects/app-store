import React from 'react'
import PropTypes from 'prop-types'

const SearchProduct = ({ value, onSearch }) => {
  return (
    <form className="d-flex mb-3">
      <input
        className="form-control"
        type="search"
        value={value}
        placeholder="Что вы ищете?"
        aria-label="Поиск"
        onChange={onSearch}
      />
    </form>
  )
}

SearchProduct.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired
}

export default SearchProduct
