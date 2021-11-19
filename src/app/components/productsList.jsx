import React from 'react';
import ProductCard from './ui/productCard';

const ProductsList = ({ items }) => {
  if (items) {
    return items.map((item) => <ProductCard key={item._id} {...item} />);
  }
};

export default ProductsList;
