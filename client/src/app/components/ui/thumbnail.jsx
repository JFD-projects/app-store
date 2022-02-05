import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { getProductById } from '../../store/products'

const Thumbnail = ({ id, size = 50 }) => {
  const product = useSelector(getProductById(id))

  if (product) {
    return (
      <img
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        src={product.image}
        alt={product.name}
      />
    )
  } else {
    return 'Loading...'
  }
}

Thumbnail.propTypes = {
  id: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default Thumbnail
