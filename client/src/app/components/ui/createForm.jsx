import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { validatorConfig } from '../../config.validator'
import { validator } from '../../utils/validator'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupsList } from '../../store/groups'
import { createProduct } from '../../store/products'

const CreateForm = ({ show, onClose }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    name: '',
    group: '',
    price: 0,
    count: 0,
    image: ''
  })

  const groups = useSelector(getGroupsList())
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)

    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    dispatch(createProduct(data))
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Название товара"
            name="name"
            value={data.name}
            error={errors.name}
            onChange={handleChange}
          />
          <SelectField
            label="Группа товара"
            defaultOption="Choose..."
            name="group"
            value={data.group}
            error={errors.group}
            options={groups}
            onChange={handleChange}
          />
          <TextField
            label="Цена"
            name="price"
            type="number"
            value={data.price}
            error={errors.price}
            onChange={handleChange}
          />
          <TextField
            label="Количество"
            name="count"
            type="number"
            value={data.count}
            error={errors.count}
            onChange={handleChange}
          />
          <TextField
            label="Фото"
            name="image"
            value={data.image}
            error={errors.image}
            onChange={handleChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isValid}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

CreateForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default CreateForm
