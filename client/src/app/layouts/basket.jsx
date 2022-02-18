import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/container'
import Loader from '../components/common/loader'
import BasketCard from '../components/ui/basketCard'
import useToggle from '../hooks/useToggle'
import { getProductsList } from '../store/products'
import { getSumCountsOfBasket, getUser, getUserLoadingStatus, updateUser } from '../store/user'

const Basket = () => {
  const dispatch = useDispatch()
  const products = useSelector(getProductsList())
  const isLoadingUser = useSelector(getUserLoadingStatus())
  const [basket, setBasket] = useState([])
  const [amount, setAmount] = useState()
  const user = useSelector(getUser())
  const count = useSelector(getSumCountsOfBasket())
  const [show, setShow] = useToggle(false)

  useEffect(() => {
    if (user && user?.basket && user.basket.length > 0) {
      setBasket(user.basket)
    }
  }, [user])

  useEffect(() => {
    setAmount(getSumOfBasket())
  }, [basket])

  const handleDelete = (productId) => {
    const newBasket = user.basket.filter((b) => b._id !== productId)
    const userWithChangedBasket = { ...user, basket: newBasket }
    dispatch(updateUser(userWithChangedBasket))
  }

  function getSumOfBasket() {
    if (basket) {
      const productsList = []
      for (const b of basket) {
        for (const p of products) {
          if (b._id === p._id) {
            productsList.push(p.price * b.count)
            break
          }
        }
      }
      return productsList.reduce((a, b) => a + b, 0)
    }
  }

  const handleIncrement = (productId) => {
    dispatch(updateUser(getUserWithUpdatedBasket(productId, (state) => state + 1)))
  }

  const handleDecrement = (productId) => {
    dispatch(updateUser(getUserWithUpdatedBasket(productId, (state) => state - 1)))
  }

  function getUserWithUpdatedBasket(productId, fn) {
    const newBasket = [...basket]
    const index = basket.findIndex((p) => p._id === productId)
    if (!fn(newBasket[index].count)) {
      newBasket.splice(index, 1)
    } else {
      newBasket[index] = { ...newBasket[index], count: fn(newBasket[index].count) }
    }
    return { ...user, basket: newBasket }
  }

  const handleSend = () => {
    if (count) {
      dispatch(updateUser({ ...user, basket: [] }))
      setShow(true)
    }
  }

  if (isLoadingUser) return <Loader />

  return (
    <main>
      <Container>
        <div className="row d-flex">
          <div className="col-md-9 col-sm flex-grow-1 position-relative">
            {count ? (
              <>
                {basket.map((item) => (
                  <BasketCard
                    key={item._id}
                    productId={item._id}
                    count={item.count}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-center">Корзина пуста</h1>
            )}
          </div>
          <div className="col-md-3 col-sm mb-4">
            <p className="card-text">
              {<b>Итого: {new Intl.NumberFormat('ru-RU').format(count ? amount : 0)} ₽</b>}
            </p>
            <Button
              variant="outline-dark"
              className="mt-auto mb-4 w-50"
              onClick={handleSend}
              disabled={!count}>
              Отправить заказ
            </Button>
          </div>
        </div>
      </Container>
      <Modal show={show} onHide={setShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Поздравляем!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ваш заказ был успешно отправлен!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setShow}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default Basket
