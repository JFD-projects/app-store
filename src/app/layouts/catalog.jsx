import React from 'react'
import { useParams } from 'react-router-dom'
import ProductsCatalogPage from '../components/pages/productsCatalogPage'
import ProductPage from '../components/pages/productPage'

const Catalog = () => {
  const params = useParams()
  const { productId } = params

  return <>{productId ? <ProductPage id={productId} /> : <ProductsCatalogPage />}</>
}

export default Catalog
