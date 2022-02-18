import PropTypes from 'prop-types'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import { getGroupsList } from '../../store/groups'
import { createProduct } from '../../store/products'
import ProductForm from './productForm'

const CreateForm = ({ show, onClose }) => {
  const dispatch = useDispatch()
  const [{ data, errors, isValid }, onChange] = useForm({
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
        <ProductForm
          onSubmit={handleSubmit}
          data={data}
          errors={errors}
          isValid={isValid}
          onChange={onChange}
          groups={groups}
        />
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
