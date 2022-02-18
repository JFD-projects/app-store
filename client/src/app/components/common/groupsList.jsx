import PropTypes from 'prop-types'
import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

const GroupsList = ({
  items,
  valueProperty,
  contentProperty,
  selectedItem,
  onItemSelect,
  onSelectClear
}) => {
  if (items) {
    const itemsArray = !Array.isArray(items) ? Object.keys(items).map((item) => items[item]) : items

    return (
      <div className="d-flex flex-column">
        <ListGroup>
          {itemsArray.map((item) => (
            <ListGroup.Item
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              active={item === selectedItem}
              role="button">
              {item[contentProperty]}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          variant="secondary"
          className="mt-3"
          onClick={onSelectClear}
          disabled={!selectedItem}>
          Показать все
        </Button>
      </div>
    )
  }

  return 'Loading...'
}

GroupsList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupsList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func,
  onSelectClear: PropTypes.func
}

export default GroupsList
