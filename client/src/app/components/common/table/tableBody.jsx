import { get } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    const component = columns[column].component
    if (component) {
      return component(item)
    }

    return get(item, columns[column].path)
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object
}

export default TableBody
