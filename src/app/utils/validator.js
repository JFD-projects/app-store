export const validator = (data, config) => {
  const errors = {}
  function validate(method, data, config) {
    let statusValidate

    switch (method) {
    case 'isRequired':
      statusValidate = !data.trim()
      break
    case 'isEmail': {
      const emailRegExp = /^\S+@\S+\.\S+$/g
      statusValidate = !emailRegExp.test(data)
      break
    }
    case 'isCapitalSymbol': {
      const capitalRegExp = /[A-Z]+/g
      statusValidate = !capitalRegExp.test(data)
      break
    }
    case 'isDigitalSymbol': {
      const digitalRegExp = /\d+/g
      statusValidate = !digitalRegExp.test(data)
      break
    }
    case 'min': {
      statusValidate = data.length < config.value
      break
    }
    default:
      break
    }

    if (statusValidate) return config.message
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod])

      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}
