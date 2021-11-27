import React, { useState, useEffect } from 'react'
import GroupsList from './common/groupsList'
import ProductsList from './productsList'
import api from '../api'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import SortProducts from './ui/sortProducts'
import { orderBy } from 'lodash'
import Container from './common/container'
import SearchProduct from './ui/searchProduct'

const Catalog = () => {
  const [groups, setGroups] = useState()
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
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
  }, [selectedGroup, searchQuery])

  const handleSearchQuery = ({ target }) => {
    setSelectedGroup()
    setSearchQuery(target.value)
  }

  const handleGroupSelect = (group) => {
    setSearchQuery('')
    setSelectedGroup(group)
  }

  const handleClearSelect = () => {
    setSelectedGroup()
  }

  const filtredProducts = searchQuery
    ? products.filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : selectedGroup
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
    <main>
      <Container>
        <SearchProduct value={searchQuery} onSearch={handleSearchQuery} />
        <div className="row d-flex">
          <div className="col-md-4 col-sm mb-4">
            <GroupsList
              items={groups}
              selectedItem={selectedGroup}
              onItemSelect={handleGroupSelect}
              onSelectClear={handleClearSelect}
              onClearItem
            />
          </div>
          <div className="col-md-8 col-sm flex-grow-1">
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
      </Container>
    </main>
  )
}

export default Catalog
