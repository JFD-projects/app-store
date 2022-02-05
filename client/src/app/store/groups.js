import { createSlice } from '@reduxjs/toolkit'
import groupsService from '../service/groups.service'

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    entities: null,
    lastFetch: null,
    error: null,
    isLoading: true
  },
  reducers: {
    groupsRequested: (state) => {
      state.isLoading = true
    },
    groupsRecieved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    groupsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: groupsReducer, actions } = groupsSlice
const { groupsRequested, groupsRecieved, groupsRequestFailed } = actions

export const loadGroupsList = () => async (dispatch) => {
  dispatch(groupsRequested())
  try {
    const { content } = await groupsService.get()
    dispatch(groupsRecieved(content))
  } catch (error) {
    dispatch(groupsRequestFailed(error.message))
  }
}

export const getGroupsList = () => (state) => state.groups.entities
export const getGroupById = (id) => (state) => {
  if (state.groups.entities) {
    return state.groups.entities.find((g) => g._id === id)
  }
}

export const getGroupsLoadingStatus = () => (state) => state.groups.isLoading

export default groupsReducer
