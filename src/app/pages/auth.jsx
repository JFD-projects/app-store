import React, { useEffect, useState } from 'react'
import Container from '../components/common/container'
import TextField from '../components/common/textField'
import { validator } from '../utils/validator'

const Auth = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
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
      },
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
    console.log(errors)
    if (!isValid) return
    console.log(data)
  }

  return (
    <main>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={data.email}
            error={errors.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={data.password}
            error={errors.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={!isValid}>Submit</button>
        </form>
      </Container>
    </main>
  )
}

export default Auth
