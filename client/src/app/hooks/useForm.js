import { useState, useEffect } from 'react'
import { validator } from '../utils/validator'
import { validatorConfig } from '../config.validator'

function useForm(initialData) {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})

  const onChange = (target) => {
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

  return { data, errors, isValid, onChange }
}

export default useForm
