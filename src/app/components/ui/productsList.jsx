import React from 'react'
import ProductCard from './productCard'

import PropTypes from 'prop-types'

const ProductsList = ({ items }) => {
  if (items) {
    return items.map((item) => <ProductCard key={item._id} {...item}/>)
  }
}

ProductsList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default ProductsList
