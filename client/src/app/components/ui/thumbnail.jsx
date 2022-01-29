import PropTypes from 'prop-types'
import React from 'react'
import { useProducts } from '../../hooks/useProducts'

const Thumbnail = ({ id }) => {
  const { getProductById } = useProducts()
  const product = getProductById(id)

  if (product) {
    return (
      <div>
        <img style={{ width: '50px', height: '50px', objectFit: 'contain' }} src={product.image} alt={product.name} />
      </div>
    )
  } else {
    return 'Loading...'
  }
}

Thumbnail.propTypes = {
  id: PropTypes.string.isRequired
}

export default Thumbnail
