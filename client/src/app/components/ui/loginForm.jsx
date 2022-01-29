import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const { logIn } = useAuth()

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
    setEnterError(null)
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
    if (!isValid) return
    try {
      await logIn(data)
      history.push('/catalog')
    } catch (error) {
      setEnterError(error.message)
    }
    console.log(data)
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
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto mb-4"
        type="submit"
        disabled={!isValid || enterError}>
        Отправить
      </button>
    </form>
  )
}

export default LoginForm
