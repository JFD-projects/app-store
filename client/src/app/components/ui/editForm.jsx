import PropTypes from 'prop-types'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import { getGroupsList } from '../../store/groups'
import { getProductById, updateProduct } from '../../store/products'
import ProductForm from './productForm'

const EditForm = ({ id, show, onClose }) => {
  const dispatch = useDispatch()
  const product = useSelector(getProductById(id))
  const groups = useSelector(getGroupsList())
  const [{ data, errors, isValid }, onChange] = useForm(product)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return

    dispatch(updateProduct({ ...data, price: +data.price, count: +data.count }))
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить</Modal.Title>
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
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

EditForm.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default EditForm
