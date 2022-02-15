import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../service/auth.service'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'
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
      state.dataLoaded = false
    },
    userUpdateSuccessed: (state, action) => {
      state.entities = { ...state.entities, ...action.payload }
    }
  }
})

const { reducer: userReducer, actions } = userSlice
const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userRequested,
  userReceived,
  userRequestFailed,
  userLoggedOut,
  userUpdateSuccessed,
} = actions

const updateUserRequested = createAction('user/updateUserRequested')
const userUpdateFailed = createAction('user/userUpdateFailed')

export const signUp = (payload) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register(payload)
      console.log('🚀 ~ data', data)
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
      history.push('/')
    } catch (error) {
      dispatch(authRequestSuccess(error.message))
    }
  }

export const logIn = ({ payload, redirect }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.login(payload)
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.localId }))
      console.log('🚀 ~ redirect', redirect)
      dispatch(loadUser())
      // history.push(redirect)
      history.goBack()
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
    const { content } = await userService.getCurrentUser()
    dispatch(userReceived(content))
  } catch (error) {
    dispatch(userRequestFailed(error.message))
  }
}

export const logOut = () => async (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(updateUserRequested())

  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdateSuccessed(content))
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

export const getUser = () => (state) => state.user.entities

export const getUserCartList = () => (state) => {
  if (state.user.entities?.basket) {
    return state.user.entities.basket
  } else {
    return null
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
export const getSumCountsOfBasket = () => (state) => {
  if (state.user.entities?.basket && state.user.entities?.basket.length > 0) {
    let sum = 0
    for (const p of state.user.entities.basket) {
      sum += p.count
    }
    return sum
  } else return 0
}


export default userReducer
