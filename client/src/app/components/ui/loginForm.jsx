import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, logIn } from '../../store/user'
import history from '../../utils/history'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const loginError = useSelector(getAuthErrors())

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = history.location.state ? history.location.state.from.pathname : '/'

    dispatch(logIn({ payload: data, redirect }))
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
      {loginError && <p className="text-danger">{loginError}</p>}
      <button className="btn btn-primary w-100 mx-auto mb-4" type="submit" disabled={!isValid}>
        Отправить
      </button>
    </form>
  )
}

export default LoginForm
