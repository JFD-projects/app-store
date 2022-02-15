import React from 'react'
import PropTypes from 'prop-types'
import Container from '../../common/container'
import { Button, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../store/products'
import { getUser, getUserIsLoggedIn, updateUser } from '../../../store/user'
import { useHistory } from 'react-router-dom'

const ProductPage = ({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(getUser())
  const product = useSelector(getProductById(id))
  const isLoggedIn = useSelector(getUserIsLoggedIn())

  const handleCart = () => {
    if (isLoggedIn) {
      const newBasket = [...user.basket]
      const index = newBasket.findIndex((p) => p._id === product._id)

      if (index !== -1) {
        newBasket[index] = { ...newBasket[index], count: newBasket[index].count + 1 }
      } else {
        newBasket.push({ _id: product._id, count: 1 })
      }

      dispatch(updateUser({ ...user, basket: newBasket }))
    } else {
      history.push('/login')
    }
  }

  return (
    <main>
      <Container>
        {/* <SearchProduct/> */}
        <div className="row d-flex mt-5">
          <div className="col-md-5 col-sm mb-4">
            <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
          </div>
          <div className="col-md-6 offset-md-1 col-sm d-flex flex-column">
            <div className="d-inline-flex mb-3">
              <Badge bg="light" text="secondary">
                ID: {id}
              </Badge>
            </div>
            <h1 className="card-title mb-4">{product.name}</h1>
            <p className="card-price mb-4">
              <b className="fs-1">{new Intl.NumberFormat('ru-RU').format(product.price)} ₽</b>
            </p>
            <Button variant="outline-dark" className="mt-auto mb-4 w-50" onClick={handleCart}>
              {'Купить'}
            </Button>
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
