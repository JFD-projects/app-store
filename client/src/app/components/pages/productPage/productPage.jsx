import React, { useState, useEffect } from 'react'
import api from '../../../api'
import PropTypes from 'prop-types'
import Container from '../../common/container'
import Counter from '../../common/counter'
import { Button, Badge } from 'react-bootstrap'
import Loader from '../../common/loader'
// import SearchProduct from '../../ui/searchProduct'

const ProductPage = ({ id }) => {
  const [product, setProduct] = useState()
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    setCount(count - 1)
  }

  useEffect(() => {
    api.products.getById(id).then((data) => {
      setProduct(data)
    })
  }, [])

  if (!product) return <Loader/>

  return (
    <main>
      <Container>
        {/* <SearchProduct/> */}
        <div className="row d-flex mt-5">
          <div className="col-md-5 col-sm mb-4">
            <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
          </div>
          <div
            className="col-md-6 offset-md-1 col-sm flex-grow-1 position-relative"
            style={{ minHeight: '300px' }}>
            <h1 className="card-title mb-4">{product.name}</h1>
            <p className="card-price mb-4">
              <b className="fs-1">{new Intl.NumberFormat('ru-RU').format(product.price)} ₽</b>
            </p>
            <div className="d-flex mb-3">
              <Counter value={count} onIncrement={handleIncrement} onDecrement={handleDecrement} />
              <Button variant="primary" className="ms-4">Добавить в корзину</Button>
            </div>
            <p className="position-absolute bottom-0 end-0">
              <Badge bg="light" text="secondary">
                ID: {id}
              </Badge>
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
