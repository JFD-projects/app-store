import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import groupsService from '../service/groups.service'
import PropTypes from 'prop-types'

const GroupsContext = React.createContext()

export const useGroups = () => {
  return useContext(GroupsContext)
}

const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    if (error) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getGroups() {
    try {
      const { content } = await groupsService.get()
      setGroups(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getGroupById(id) {
    return groups.find(group => group._id === id)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  return <GroupsContext.Provider value={{ isLoading, groups, getGroupById }}>{children}</GroupsContext.Provider>
}

export default GroupsProvider

GroupsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
