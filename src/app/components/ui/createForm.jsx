import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import api from '../../api'
import { validatorConfig } from '../../config.validator'
import { validator } from '../../utils/validator'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import Loader from '../common/loader'

const CreateForm = ({ show, onClose, onChangeData }) => {
  const [data, setData] = useState({
    _id: '',
    name: '',
    group: '',
    price: 0,
    count: 0,
    image: ''
  })

  const [groups, setGroups] = useState([])
  const [errors, setErrors] = useState({})

  const [dataTypeOfNumber] = useState(() =>
    Object.keys(data).filter((value) => typeof data[value] === 'number')
  )

  useEffect(() => {
    api.groupsObject.fetchAll().then((data) => setGroups(data))
  }, [])

  const handleChange = ({ target }) => {
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

  const formatData = (data, dataTypeOfNumber) => {
    for (const [key, value] of Object.entries(data)) {
      if (dataTypeOfNumber.includes(key)) {
        data[key] = +value
      }
    }

    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(formatData(data, dataTypeOfNumber))
    onClose()
    onChangeData()
  }

  if (!Object.keys(groups).length) return <Loader />

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            name="id"
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
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

CreateForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeData: PropTypes.func.isRequired
}

export default CreateForm
