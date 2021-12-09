export const validatorConfig = {
  _id: {
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
      message: 'Допустимо только цифровое значение'
    }
  },
  count: {
    isRequired: {
      message: 'Поле обязательно для заполнения!'
    },
    isDigit: {
      message: 'Допустимо только цифровое значение'
    }
  },
  image: {
    isRequired: {
      message: 'Поле обязательно для заполнения!'
    }
  }
}
