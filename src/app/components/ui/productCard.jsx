import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductCard = ({ _id, image, name, price }) => {
  return (
    <div key={_id} className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center">
          <img src={image} className="img-fluid rounded-start" alt={name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              <small className="text-muted">{'Артикул ' + _id}</small>
            </p>
            <p className="card-text">{<b>{new Intl.NumberFormat('ru-RU').format(price)} ₽</b>}</p>
            <Link to={'catalog/'+ _id} id={_id} image={image} name={name} price={price} role="button" className="btn btn-primary">Показать</Link>
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
