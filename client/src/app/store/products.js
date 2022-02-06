import { createAction, createSlice } from '@reduxjs/toolkit'
import productsService from '../service/products.service'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    entities: null,
    lastFetch: null,
    error: null,
    isLoading: false
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true
    },
    productsRecieved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    productCreated: (state, action) => {
      state.entities = [...state.entities, action.payload]
    },
    productUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((p) => p._id === action.payload._id)] = action.payload
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload)
    }
  }
})

const { reducer: productsReducer, actions } = productsSlice
const {
  productsRequested,
  productsRecieved,
  productsRequestFailed,
  productCreated,
  productUpdateSuccessed,
  productRemoved
} = actions

const addProductRequested = createAction('products/addProductRequested')
const updataProductRequested = createAction('products/updataProductRequested')
const productUpdateFailed = createAction('products/productUpdateFailed')
const removeProductRequested = createAction('products/removeProductRequested')

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested())

  try {
    const { content } = await productsService.get()
    dispatch(productsRecieved(content))
  } catch (error) {
    dispatch(productsRequestFailed(error.message))
  }
}

export const createProduct = (data) => async (dispatch) => {
  dispatch(addProductRequested())

  try {
    const { content } = await productsService.create(data)
    dispatch(productCreated(content))
  } catch (error) {
    dispatch(productsRequestFailed(error.message))
  }
}

export const updateProduct = (payload) => async (dispatch) => {
  dispatch(updataProductRequested())

  try {
    const { content } = await productsService.update(payload)
    dispatch(productUpdateSuccessed(content))
  } catch (error) {
    dispatch(productUpdateFailed(error.message))
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(removeProductRequested())

  try {
    const { content } = await productsService.delete(id)

    if (!content) {
      dispatch(productRemoved(id))
    }
  } catch (error) {
    dispatch(productsRequestFailed(error.message))
  }
}

export const getProductsList = () => (state) => state.products.entities
export const getProductById = (id) => (state) => {
  if (state.products.entities) {
    return state.products.entities.find((p) => p._id === id)
  }
}

export const getProductsLoadingStatus = () => (state) => state.products.isLoading

export default productsReducer
