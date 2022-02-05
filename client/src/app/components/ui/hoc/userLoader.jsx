import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserDataStatus } from '../../../store/user'
import Loader from '../../common/loader'
import PropTypes from 'prop-types'

const UserLoader = ({ children }) => {
  const dataStatus = useSelector(getUserDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if(!dataStatus) dispatch(getUser())
  }, [])

  if(!dataStatus) return <Loader/>
  return children
}

UserLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default UserLoader
