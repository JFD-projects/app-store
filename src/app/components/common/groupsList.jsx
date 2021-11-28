import React from 'react'
import PropTypes from 'prop-types'

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
        <ul className="list-group">
          {itemsArray.map((item) => (
            <li
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              role="button"
              className={`list-group-item list-group-item-action
                ${item === selectedItem ? ' active' : ''}`}>
              {item[contentProperty]}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={onSelectClear}
          disabled={!selectedItem}>
          Показать все
        </button>
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
