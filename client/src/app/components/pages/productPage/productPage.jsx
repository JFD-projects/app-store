import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Container from '../../common/container'
import { Button, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../store/products'
import { getUser , updateUser } from '../../../store/user'

const ProductPage = ({ id }) => {
  const dispatch = useDispatch()
  const product = useSelector(getProductById(id))
  const user = useSelector(getUser())
  const [countProduct, setCountProduct] = useState(0)

  useEffect(() => {
    if (user && user?.basket && user.basket.length > 0) {
      const countProductInBasket = user.basket.find((b) => b._id === id)?.count
      if (countProductInBasket) {
        setCountProduct(countProductInBasket)
      }
    }
  }, [user])

  const handleBasket = () => {
    const newBasket = [...user.basket]
    const index = user.basket.findIndex((b) => b._id === product._id)
    index !== -1
      ? (newBasket[index] = { ...newBasket[index], count: countProduct + 1 })
      : newBasket.push({ _id: product._id, count: countProduct + 1 })

    const userWithChangedBasket = { ...user, basket: newBasket }
    console.log(userWithChangedBasket)
    dispatch(updateUser(userWithChangedBasket))
  }

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
              <Button variant="primary" className="me-4" onClick={handleBasket}>
                Добавить в корзину
              </Button>
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
