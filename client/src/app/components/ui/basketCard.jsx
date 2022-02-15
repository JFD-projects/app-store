import React from 'react'
import { Badge } from 'react-bootstrap'
import Counter from '../common/counter'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProductById } from '../../store/products'

const BasketCard = ({ productId, count, onDelete, ...rest }) => {
  const product = useSelector(getProductById(productId))
  const { name, image, price } = product
  const sum = price * count

  const handleDelete = () => {
    onDelete(productId)
  }

  return (
    <div className="card mb-3">
      <div className="row g-0 d-flex p-3">
        <div className="col-md-3 col d-flex align-items-center" style={{ height: '250px' }}>
          <img
            src={image}
            className="img-fluid rounded-start"
            alt={name}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
        <div className="col-md-4 col">
          <div className="card-body">
            <Badge bg="light" text="secondary" className="mb-4">
              ID: {productId}
            </Badge>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div>
                <p className="card-text"></p>
                <h5 className="card-title">{name}</h5>
                <p className="card-price mb-4">
                  <b className="fs-1">{new Intl.NumberFormat('ru-RU').format(price)} ₽</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col d-flex align-items-center">
          <Counter id={productId} value={count} {...rest} />
        </div>
        <div className="col-md-2 col d-flex align-items-center justify-content-center">
          <p className="card-text d-flex flex-wrap">
            <b className='me-1'>Всего:</b> {<b>{new Intl.NumberFormat('ru-RU').format(sum)} ₽</b>}
          </p>
        </div>
      </div>
      <button className="position-absolute top-0 end-0 btn" onClick={handleDelete}>
        <i className="bi bi-x-lg"></i>
      </button>
    </div>
  )
}

BasketCard.propTypes = {
  productId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onDelete: PropTypes.func
}

export default BasketCard
