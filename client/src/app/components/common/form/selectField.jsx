import PropTypes from 'prop-types'
import React from 'react'

const SelectField = ({ label, name, value, defaultOption, options, error, onChange }) => {
  
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

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
      <label className="form-label" htmlFor="validationCustom04">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        name={name}
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options && optionsArray.map((option) => <option key={option._id} value={option._id}>{option.name}</option>)}
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
