import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const { signUp } = useAuth()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения!'
      },
      isEmail: {
        message: 'Адрес почты введен некорректно!'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения!'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву!'
      },
      isDigitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну цифру!'
      },
      min: {
        message: 'Пароль должен быть не меньше 8 символов!',
        value: 8
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    console.log(errors)
    if (!isValid) return
    console.log(data)

    try {
      await signUp(data)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Почта"
        name="email"
        value={data.email}
        error={errors.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100 mx-auto mb-4" type="submit" disabled={!isValid}>
        Отправить
      </button>
    </form>
  )
}

export default RegisterForm
