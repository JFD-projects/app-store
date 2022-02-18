import PropTypes from 'prop-types'
import React from 'react'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'

const ProductForm = ({ data, errors, onChange, onSubmit, groups }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Название товара"
        name="name"
        value={data.name}
        error={errors.name}
        onChange={onChange}
      />
      <SelectField
        label="Группа товара"
        defaultOption="Choose..."
        name="group"
        value={data.group}
        error={errors.group}
        options={groups}
        onChange={onChange}
      />
      <TextField
        label="Цена"
        name="price"
        type="number"
        value={data.price}
        error={errors.price}
        onChange={onChange}
      />
      <TextField
        label="Количество"
        name="count"
        type="number"
        value={data.count}
        error={errors.count}
        onChange={onChange}
      />
      <TextField
        label="Фото"
        name="image"
        value={data.image}
        error={errors.image}
        onChange={onChange}
      />
    </form>
  )
}

ProductForm.propTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
}

export default ProductForm
