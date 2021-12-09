import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

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
