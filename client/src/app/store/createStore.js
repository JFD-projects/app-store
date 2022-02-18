import { combineReducers, configureStore } from '@reduxjs/toolkit'
import groupsReducer from './groups'
import productsReducer from './products'
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  groups: groupsReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
