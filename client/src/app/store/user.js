import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../service/auth.service'
import localStorageService from '../service/localStorage.service'
import usersService from '../service/users.service'
import { generateAuthError } from '../utils/generateAuthError'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false,
    isLoading: true
  }
  : {
    entities: null,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false,
    isLoading: false
  }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    userCreated: (state, action) => {
      state.entities = action.payload
    },
    userRequested: (state) => {
      state.isLoading = true
    },
    userReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
    }
  }
})

const { reducer: userReducer, actions } = userSlice
const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userRequested,
  userReceived,
  userRequestFailed,
  userLoggedOut
} = actions

const userCreateRequasted = createAction('user/userCreateRequacted')
const createUserFailed = createAction('user/createUserFailed')

export const signUp = ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register({ email, password, ...rest })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      dispatch(
        createUser({
          _id: data.localId,
          email,
          isAdmin: false,
          basket: null,
          ...rest
        })
      )
    } catch (error) {
      dispatch(authRequestSuccess(error.message))
    }
  }

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequasted())
    try {
      const { content } = await usersService.create(payload)
      dispatch(userCreated(content))
      history.push('/')
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
}

export const logIn = ({ payload, redirect }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.login(payload)
      dispatch(authRequestSuccess({ userId: data.localId }))
      localStorageService.setTokens(data)
      dispatch(loadUser())
      history.push(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const loadUser = () => async (dispatch) => {
  dispatch(userRequested())
  try {
    const { content } = await usersService.getCurrentUser()
    dispatch(userReceived(content))
    localStorageService.setData(content)
  } catch (error) {
    dispatch(userRequestFailed(error.message))
  }
}

export const logOut = () => async (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const getUser = () => (state) => state.user.entities
export const getUserBasket = () => (state) => {
  if (state.user.entities) {
    return state.user.entities.basket
  }
}
export const getUserIsAdmin = () => (state) => {
  if (state.user.entities) {
    return state.user.entities.isAdmin
  }
}

export const getUserIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getUserDataStatus = () => (state) => state.user.dataLoaded
export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getAuthErrors = () => (state) => state.user.error

export default userReducer
