import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, countItem, pageSize, onPageChange }) => {
  const pageCount = Math.ceil(countItem / pageSize)
  
  if (pageCount <= 1) return null

  const pages = [...Array(pageCount).keys()].map((_) => _ + 1)

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={'page-item' + (page === currentPage ? ' active' : '')}
            aria-current="page"
            onClick={() => onPageChange(page)}>
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  countItem: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination
