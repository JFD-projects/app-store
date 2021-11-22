import React from 'react'
import PropTypes from 'prop-types'

const SortProducts = ({ sortList, selectedSort, onSort }) => {
  const handleSort = (item) => {
    onSort(
      selectedSort.path === item
        ? { ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' }
        : { path: item, order: 'asc' }
    )
  }

  const renderSortPointer = (item) => {
    const style = {
      position: 'absolute',
      left: '-12px',
      color: 'var(--bs-blue)'
    }

    if (selectedSort.path === item) {
      const cl = 'bi-sort-' + (selectedSort.order === 'asc' ? 'down-alt' : 'up-alt')
      return <i className={cl} style={style}></i>
    }
    return null
  }

  return (
    <div className="d-flex justify-content-end mb-3 me-3">
      {Object.keys(sortList).map((item) => (
        <span
          key={item}
          role="button"
          className="d-inline-block ms-4 ps-2 position-relative"
          onClick={() => handleSort(sortList[item].path)}>
          {renderSortPointer(sortList[item].path)}
          {sortList[item].name}
        </span>
      ))}
    </div>
  )
}

SortProducts.propTypes = {
  sortList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
}

export default SortProducts
