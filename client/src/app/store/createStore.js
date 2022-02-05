import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import productsReducer from './products'
import groupsReducer from './groups'

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
