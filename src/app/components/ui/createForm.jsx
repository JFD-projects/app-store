import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import api from '../../api'
import SelectField from '../common/form/selectField'

const CreateForm = () => {
  const [data, setData] = useState({
    id: '',
    name: '',
    group: '',
    price: 0,
    count: 0,
    image: ''
  })
  const [dataTypeOfNumber] = useState(() =>
    Object.keys(data).filter((value) => typeof data[value] === 'number')
  )

  const [groups, setGroups] = useState()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.groupsObject.fetchAll().then((data) => setGroups(data))
  }, [])

  const handleChange = ({ target }) => {
    console.log(target.value)
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    id: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      }
    },
    name: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      }
    },
    group: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      }
    },
    price: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      },
      isDigit: {
        message: 'Допусимо только цифровое значение'
      }
    },
    count: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      },
      isDigit: {
        message: 'Допусимо только цифровое значение'
      }
    },
    image: {
      isRequired: {
        message: 'Поле обязательно для заполнения!'
      }
    }
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="p-2 fw-bold">Добавить / Изменить</p>
      <TextField label="ID" name="id" value={data.id} error={errors.id} onChange={handleChange} />
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
      <button className="btn btn-primary w-100 mx-auto mb-4" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}

export default CreateForm
