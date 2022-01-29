import React from 'react'
import { Button, Badge } from 'react-bootstrap'

import PropTypes from 'prop-types'

const Counter = ({ value, onIncrement, onDecrement }) => {
  return (
    <div className="d-flex align-items-center">
      <Button variant="success" onClick={onIncrement}>
        +
      </Button>
      <Badge
        bg={value ? 'primary' : 'secondary'}
        text={value ? '' : 'light'}
        className="fs-4 ms-2 me-2"
        style={{ minWidth: '100px' }}>
        {value <= 0 ? 'Пусто' : value}
      </Badge>
      <Button variant="danger" onClick={onDecrement} disabled={!value}>
        -
      </Button>
    </div>
  )
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
