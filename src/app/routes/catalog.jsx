import React, { useState, useEffect } from 'react'
import GroupsList from '../components/common/groupsList'
import ProductsList from '../components/productsList'
import api from '../api'
import Pagination from '../components/pagination'
import { paginate } from '../utils/paginate'

const Catalog = () => {
  const [groups, setGroups] = useState()
  const [products, setProducts] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2

  useEffect(() => {
    api.products.fetchAll().then((data) => setProducts(data))
  }, [])

  useEffect(() => {
    api.groupsObject.fetchAll().then((data) => setGroups(data))
  }, [])

  const handleGroupSelect = (group) => {
    setSelectedGroup(group)
    setCurrentPage(1)
  }

  const handleClearSelect = () => {
    setSelectedGroup()
  }

  const filtredProducts = selectedGroup
    ? products.filter((p) => JSON.stringify(p.group) === JSON.stringify(selectedGroup))
    : products

  const productsCrop = paginate(filtredProducts, currentPage, pageSize)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const count = filtredProducts.length

  return (
    <div className="row d-flex">
      <div className="col-md-3">
        <GroupsList
          items={groups}
          selectedItem={selectedGroup}
          onItemSelect={handleGroupSelect}
          onSelectClear={handleClearSelect}
          onClearItem
        />
      </div>
      <div className="col flex-grow-1 ms-3">
        <ProductsList items={productsCrop} />
        <Pagination
          currentPage={currentPage}
          countItem={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Catalog
