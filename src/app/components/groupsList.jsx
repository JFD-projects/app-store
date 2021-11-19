import React from 'react';

const GroupsList = ({ items, selectedItem, onItemSelected, onSelectClear }) => {
  if (items) {
    return (
      <div className='d-flex flex-column' style={{ width: '280px' }}>
        <ul className='list-group'>
          {Object.keys(items).map((item) => (
            <li
              key={items[item]._id}
              onClick={() => onItemSelected(items[item])}
              role='button'
              className={`list-group-item list-group-item-action
                ${items[item] === selectedItem ? ' active' : ''}`}
            >
              {items[item].name}
            </li>
          ))}
        </ul>
        <button
          type='button'
          className='btn btn-secondary mt-3'
          onClick={onSelectClear}
          disabled={!selectedItem}
        >
          Показать все
        </button>
      </div>
    );
  }

  return 'Loading...';
};

export default GroupsList;
