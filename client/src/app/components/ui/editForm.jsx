import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
// import api from '../../api'
import { validatorConfig } from '../../config.validator'
import { useGroups } from '../../hooks/useGroups'
import { useProducts } from '../../hooks/useProducts'
import { validator } from '../../utils/validator'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import Loader from '../common/loader'

const EditForm = ({ id, show, onClose /* , onChangeData */ }) => {
  const [data, setData] = useState({
    _id: '',
    name: '',
    group: '',
    price: 0,
    count: 0,
    image: ''
  })

  const { groups, isLoading: isLoadingGroups } = useGroups()
  const { getProductById, updateProductData } = useProducts()
  const product = getProductById(id)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isLoadingGroups) {
      setData(product)
    }
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  // const getGroupById = (id) => {
  //   for (const group in groups) {
  //     const groupData = groups[group]
  //     if (groupData._id === id) return groupData
  //   }
  // }

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
    updateProductData({ ...data, price: +data.price, count: +data.count })
    onClose()

    // api.products
    //   .update(id, {
    //     ...data,
    //     group: getGroupById(data.group)
    //   })
    //   .then(() => {
    //     onClose()
    //     onChangeData()
    //   })
  }

  if (isLoadingGroups) return <Loader />

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
            onChange={handleChange}
          />
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
  // onChangeData: PropTypes.func.isRequired
}

export default EditForm
