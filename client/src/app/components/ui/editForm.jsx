import PropTypes from 'prop-types'
import React /* , { useEffect, useState } */ from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { validatorConfig } from '../../config.validator'
import useForm from '../../hooks/useForm'
import { getGroupsList, getGroupsLoadingStatus } from '../../store/groups'
import { getProductById, updateProduct } from '../../store/products'
// import { validator } from '../../utils/validator'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import Loader from '../common/loader'

const EditForm = ({ id, show, onClose }) => {
  const dispatch = useDispatch()
  // const [data, setData] = useState()
  const product = useSelector(getProductById(id))
  const isLoadingGroups = useSelector(getGroupsLoadingStatus())
  const groups = useSelector(getGroupsList())
  // const [errors, setErrors] = useState({})
  const { data, errors, isValid, onChange } = useForm(product)
  console.log('🚀 ~ EditForm ~ data', data)

  // useEffect(() => {
  //   if (!isLoadingGroups && !data) {
  //     setData(product)
  //   }
  // }, [groups, data])

  // const handleChange = (target) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value
  //   }))
  // }

  // useEffect(() => {
  //   validate()
  // }, [data])

  // const validate = () => {
  //   const errors = validator(data, validatorConfig)
  //   setErrors(errors)

  //   return !Object.keys(errors).length
  // }

  // const isValid = !Object.keys(errors).length

  const handleSubmit = (e) => {
    e.preventDefault()
    // const isValid = validate()
    if (!isValid) return

    dispatch(updateProduct({ ...data, price: +data.price, count: +data.count }))
    onClose()
  }

  if (isLoadingGroups || !data) return <Loader />

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Изменить</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            name="_id"
            value={data._id}
            error={errors._id}
            // onChange={handleChange}
            onChange={onChange}
          />
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
