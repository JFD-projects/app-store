import React, { useState, useEffect } from 'react'
import { /* useDispatch, */ useSelector } from 'react-redux'
import Container from '../components/common/container'
import Loader from '../components/common/loader'
import BasketCard from '../components/ui/basketCard'
import { getProductsList } from '../store/products'
import {
  getUserBasket,
  /* getUserDataStatus, */ getUserLoadingStatus /* , loadUser */
} from '../store/user'

const Basket = () => {
  const products = useSelector(getProductsList())
  const userBasket = useSelector(getUserBasket())
  const isLoadingUser = useSelector(getUserLoadingStatus())
  const [basket, setBasket] = useState()
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setBasket(userBasket)
  }, [])

  useEffect(() => {
    setAmount(getSum())
  }, [basket])

  function getSum() {
    if (basket) {
      const productsList = []
      for (const b of basket) {
        for (const p of products) {
          if (b._id === p._id) {
            productsList.push(p.price)
            break
          }
        }
      }
      return productsList.reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  const handleIncrement = () => {
    setBasket(1)
  }

  const handleDecrement = () => {
    setBasket(0)
  }

  if (isLoadingUser) return <Loader />

  return (
    <main>
      <Container>
        <div className="row d-flex">
          <div className="col-md-9 col-sm flex-grow-1 position-relative">
            {basket ? (
              <>
                {basket.map((item) => (
                  <BasketCard
                    key={item._id}
                    productId={item._id}
                    count={item.count}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-center">Корзина пуста</h1>
            )}
          </div>
          <div className="col-md-3 col-sm mb-4">
            <p className="card-text">
              {<b>Итого: {new Intl.NumberFormat('ru-RU').format(amount)} ₽</b>}
            </p>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Basket
