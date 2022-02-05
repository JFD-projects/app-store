import PropTypes from 'prop-types'
import React from 'react'

const TableHeader = ({ columns, selectedSort, onSort }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const renderSortPointer = (item) => {
    const style = {
      color: 'var(--bs-blue)'
    }

    if (selectedSort.path === item) {
      const cl = 'bi bi-caret-' + (selectedSort.order === 'asc' ? 'down-fill' : 'up-fill')
      return <i className={cl} style={style}></i>
    }
    return null
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            {...{ role: columns[column].path && 'button' }}
            scope="col"
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}>
            {columns[column].name}
            {renderSortPointer(columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}

export default TableHeader
