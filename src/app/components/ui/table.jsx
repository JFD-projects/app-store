import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ data, onDelete, children, ...rest }) => {
  const columns = {
    id: { path: '_id', name: 'ID' },
    name: { path: 'name', name: 'Наименование' },
    group: { path: 'group.name', name: 'Категория' },
    price: { path: 'price', name: 'Стоимость' },
    count: { path: 'count', name: 'Кол-во' },
    image: { name: 'Фото' },
    buttons: {
      // eslint-disable-next-line react/display-name
      component: (item) => (
        <div className="d-flex">
          <button className="btn btn-primary">
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-danger ms-1" onClick={() => onDelete(item._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  }

  return (
    <table className="table table-striped">
      {children || (
        <>
          <TableHeader {...{ columns, ...rest }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  children: PropTypes.array
}

export default Table
