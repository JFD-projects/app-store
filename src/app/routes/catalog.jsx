import React, { useState, useEffect } from 'react'
import GroupsList from '../components/common/groupsList'
import ProductsList from '../components/productsList'
import api from '../api'
import Pagination from '../components/pagination'
import { paginate } from '../utils/paginate'
import SortProducts from '../components/ui/sortProducts'
import { orderBy } from 'lodash'

const Catalog = () => {
  const [groups, setGroups] = useState()
  const [products, setProducts] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  const pageSize = 3
  const sortList = {
    price: { path: 'price', name: 'По цене' },
    name: { path: 'name', name: 'По названию' }
  }

  useEffect(() => {
    api.products.fetchAll().then((data) => setProducts(data))
  }, [])

  useEffect(() => {
    api.groupsObject.fetchAll().then((data) => setGroups(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedGroup])

  const handleGroupSelect = (group) => {
    setSelectedGroup(group)
  }

  const handleClearSelect = () => {
    setSelectedGroup()
  }

  const filtredProducts = selectedGroup
    ? products.filter((p) => JSON.stringify(p.group) === JSON.stringify(selectedGroup))
    : products

  const sortedProducts = sortBy.path
    ? orderBy(filtredProducts, [sortBy.path], [sortBy.order])
    : filtredProducts

  const handleSort = (item) => setSortBy(item)

  const productsCrop = paginate(sortedProducts, currentPage, pageSize)

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
        <SortProducts sortList={sortList} selectedSort={sortBy} onSort={handleSort} />
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
