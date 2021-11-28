import React from 'react'

import PropTypes from 'prop-types'

const SelectField = ({ label, name, value, defaultOption, options, error, onChange }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
        name: options[optionName].name,
        _id: options[optionName]._id
      }))
      : options

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        name={name}
        onChange={onChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options && optionsArray.map((option) => <option key={option._id}>{option.name}</option>)}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func.isRequired
}

export default SelectField
