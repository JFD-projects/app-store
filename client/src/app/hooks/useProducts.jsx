import React, { useState, useContext, useEffect } from 'react'

import PropTypes from 'prop-types'
import Loader from '../components/common/loader'
import productService from '../service/products.service'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'

const ProductsContext = React.createContext()

export const useProducts = () => {
  return useContext(ProductsContext)
}

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (!error) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getProducts() {
    try {
      const { content } = await productService.get()
      setProducts(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getProductById(id) {
    return products.find((p) => p._id === id)
  }

  async function deleteProduct(id) {
    try {
      const { content } = await productService.delete(id)
      if (content === null) {
        setProducts((prevState) => prevState.filter((c) => c._id !== id))
      }
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function createProduct(data) {
    try {
      const { content } = await productService.create({ ...data, _id: nanoid() })
      console.log(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function updateProductData(data) {
    try {
      const { content } = await productService.update(data)
      const index = products.findIndex((p) => p._id === content._id)
      if (index !== -1) {
        setProducts((prevState) => ({ ...prevState[index], ...content }))
      }
      console.log(products)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <ProductsContext.Provider
      value={{ products, getProductById, deleteProduct, updateProductData, createProduct }}>
      {!isLoading ? children : <Loader />}
    </ProductsContext.Provider>
  )
}

ProductsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProductsProvider
