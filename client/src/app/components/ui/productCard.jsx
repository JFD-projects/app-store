import PropTypes from 'prop-types'
import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ _id, image, name, price }) => {
  return (
    <div className="card mb-3 position-relative">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center" style={{ height: '185px' }}>
          <img
            src={image}
            className="img-fluid rounded-start"
            alt={name}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Badge bg="light" text="secondary" className="position-absolute bottom-0 end-0">
              {'ID: ' + _id}
            </Badge>
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{<b>{new Intl.NumberFormat('ru-RU').format(price)} ₽</b>}</p>
            <Link
              to={'product/' + _id}
              id={_id}
              image={image}
              name={name}
              price={price}
              role="button"
              className="btn btn-primary">
              Показать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default ProductCard
