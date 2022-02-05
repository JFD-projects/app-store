import PropTypes from 'prop-types'
import React from 'react'
import { Table } from 'react-bootstrap'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const TableItems = ({ children, ...rest }) => {
  return (
    <Table responsive="md" className="table table-striped">
      {children || (
        <>
          <TableHeader {...rest} />
          <TableBody {...rest} />
        </>
      )}
    </Table>
  )
}

TableItems.propTypes = {
  children: PropTypes.array
}

export default TableItems
