import PropTypes from 'prop-types'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupsList } from '../../store/groups'
import { createProduct } from '../../store/products'
import useForm from '../../hooks/useForm'

const CreateForm = ({ show, onClose }) => {
  const dispatch = useDispatch()
  const { data, errors, isValid, onChange } = useForm({
    name: '',
    group: '',
    price: 0,
    count: 0,
    image: ''
  })

  const groups = useSelector(getGroupsList())

  const handleSubmit = (e) => {
    e.preventDefault()
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
