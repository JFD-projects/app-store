import React from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({ _id, imageURL, name, price }) => {
  return (
    <div key={_id} className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imageURL} className="img-fluid rounded-start" alt={name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              <small className="text-muted">{'Артикул ' + _id}</small>
            </p>
            <p className="card-text">{<b>{new Intl.NumberFormat('ru-RU').format(price)} ₽</b>}</p>
            <button className="btn btn-primary">Показать</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  _id: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default ProductCard
