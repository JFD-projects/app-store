import { orderBy } from 'lodash'
import React, { useEffect, useState } from 'react'
import api from '../api'
import Container from '../components/common/container'
import CreateForm from '../components/ui/createForm'
import Table from '../components/ui/table'

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

  useEffect(() => {
    api.products.fetchAll().then((data) => setProducts(data))
  }, [])

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p._id !== id))
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const sortedProducts = orderBy(products, [sortBy.path], [sortBy.order])

  return (
    <main>
      <Container>
        <div className="row d-flex">
          <div className="col-md-3 col-sm mb-4">
            <CreateForm />
          </div>
          <div className="col-md-9 col-sm flex-grow-1">
            {products && (
              <Table
                data={sortedProducts}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onSort={handleSort}
              />
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Dashboard
