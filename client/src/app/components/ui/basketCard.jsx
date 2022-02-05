import React from 'react'
import { Badge } from 'react-bootstrap'
import Counter from '../common/counter'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProductById } from '../../store/products'

const BasketCard = ({ productId, count, ...rest }) => {
  const product = useSelector(getProductById(productId))
  const { name, image, price } = product

  return (
    <div className="card mb-3">
      <div className="row g-0 d-flex">
        <div className="col-md-2 col d-flex align-items-center">
          <img src={image} className="img-fluid rounded-start" alt={name} />
        </div>
        <div className="col-md-10 col">
          <div className="card-body">
            <Badge bg="light" text="secondary" className="mb-4">
              ID: {productId}
            </Badge>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div>
                <p className="card-text"></p>
                <h5 className="card-title">{name}</h5>
              </div>
              <Counter id={productId} value={count} {...rest} />
              <p className="card-text">{<b>{new Intl.NumberFormat('ru-RU').format(price)} ₽</b>}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="position-absolute top-0 end-0 btn">
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  )
}

BasketCard.propTypes = {
  productId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

export default BasketCard
