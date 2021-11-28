import React, { useState, useEffect } from 'react'
import api from '../../../api'
import PropTypes from 'prop-types'
import Container from '../../common/container'
// import SearchProduct from '../../ui/searchProduct'

const ProductPage = ({ id }) => {
  const [product, setProduct] = useState()

  useEffect(() => {
    api.products.getById(id).then((data) => {
      setProduct(data)
    })
  }, [])

  if (!product) return 'Loading...'

  return (
    <main>
      <Container>
        {/* <SearchProduct/> */}
        <div className="row d-flex mt-5">
          <div className="col-md-5 col-sm mb-4">
            <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
          </div>
          <div className="col-md-6 offset-md-1 col-sm flex-grow-1">
            <h1 className="card-title">{product.name}</h1>
            <p className="card-price">
              <b>{new Intl.NumberFormat('ru-RU').format(product.price)} ₽</b>
            </p>
            <button className="btn btn-primary">Купить</button>
            <p className="d-flex">
              <span>id: {id}</span>
            </p>
          </div>
        </div>
      </Container>
    </main>
  )
}

ProductPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductPage
