import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import usersService from '../service/users.service'
import { setTokens } from '../service/localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message)
      if (code === 400) {
        switch (message) {
        case 'INVALID_PASSWORD':
          throw new Error('Email или пароль введены некорректно')

        default:
          throw new Error('Слишком много попыток входа. Попробуйте позднее')
        }
      }
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message)
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким email уже существует'
          }
          throw errorObject
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await usersService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser, createUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
