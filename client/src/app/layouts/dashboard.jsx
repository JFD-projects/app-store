import { orderBy } from 'lodash'
import React, { useState } from 'react'
// import api from '../api'
import Container from '../components/common/container'
import CreateForm from '../components/ui/createForm'
import TableItems from '../components/common/table'
import EditForm from '../components/ui/editForm'
import Group from '../components/ui/group'
import Thumbnail from '../components/ui/thumbnail'
import { useProducts } from '../hooks/useProducts'
import Loader from '../components/common/loader'
import { useGroups } from '../hooks/useGroups'

const Dashboard = () => {
  // const [products, setProducts] = useState([])
  const { products, deleteProduct, isLoading: isLoadingProducts } = useProducts()
  const { isLoading: isLoadingGroups } = useGroups()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [typeForm, setTypeForm] = useState()
  const [id, setId] = useState()
  const [show, setShow] = useState(false)

  const columns = {
    id: { path: '_id', name: 'ID' },
    name: { path: 'name', name: 'Наименование' },
    group: {
      path: 'group',
      name: 'Категория',
      // eslint-disable-next-line react/display-name
      component: (product) => <Group id={product.group} />
    },
    price: { path: 'price', name: 'Стоимость' },
    count: { path: 'count', name: 'Кол-во' },
    // eslint-disable-next-line react/display-name
    image: { name: 'Фото', component: (product) => <Thumbnail id={product._id} /> },
    buttons: {
      // eslint-disable-next-line react/display-name
      component: (item) => (
        <div className="d-flex">
          <button className="btn btn-primary" onClick={() => handleProductEdit(item._id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-danger ms-1" onClick={() => handleDelete(item._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  }

  // useEffect(() => {
  //   api.products.fetchAll().then((data) => setProducts(data))
  // }, [])

  // const handleChangeData = () => {
  //   api.products.fetchAll().then((data) => setProducts(data))
  // }

  const handleShow = () => setShow(true)

  const handleClose = () => {
    setShow(false)
    setTypeForm()
  }

  const handleProductEdit = (id) => {
    setId(id)
    setTypeForm('edit')
    handleShow()
  }
  const handleProductCreate = () => {
    setTypeForm('create')
    handleShow()
  }

  const handleDelete = (id) => {
    // setProducts(products.filter((p) => p._id !== id))
    deleteProduct(id)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const sortedProducts = orderBy(products, [sortBy.path], [sortBy.order])

  if (isLoadingProducts || isLoadingGroups) return <Loader />

  return (
    <main>
      <Container>
        <>
          <button className="btn btn-primary d-flex ms-auto" onClick={handleProductCreate}>
            Добавить
          </button>
          <TableItems
            columns={columns}
            data={sortedProducts}
            selectedSort={sortBy}
            onSort={handleSort}
          />
          {typeForm && (
            <>
              {typeForm === 'edit' ? (
                <EditForm
                  id={id}
                  onClose={handleClose}
                  show={show}
                  // onChangeData={handleChangeData}
                />
              ) : (
                <CreateForm
                  onClose={handleClose}
                  show={show} /* onChangeData={handleChangeData} */
                />
              )}
            </>
          )}
        </>
      </Container>
    </main>
  )
}

export default Dashboard
