import React from 'react'
import { useParams } from 'react-router-dom'
import Catalog from '../components/catalog'
import Product from '../components/product'

const Products = () => {
  const params = useParams()
  const { productId } = params

  return <>{productId ? <Product id={productId} /> : <Catalog />}</>
}

export default Products
