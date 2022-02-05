import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupsLoadingStatus, loadGroupsList } from '../../../store/groups'
import { getProductsLoadingStatus, loadProductsList } from '../../../store/products'
import { getUserIsLoggedIn, loadUser } from '../../../store/user'
import Loader from '../../common/loader'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoadingProducts = useSelector(getProductsLoadingStatus())
  const isLoadingGroups = useSelector(getGroupsLoadingStatus())
  const isLoggedInUser = useSelector(getUserIsLoggedIn())

  useEffect(() => {
    dispatch(loadGroupsList())
    dispatch(loadProductsList())
    if (isLoggedInUser) (
      dispatch(loadUser())
    )
  }, [isLoggedInUser])

  if (isLoadingProducts || isLoadingGroups) return <Loader />

  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AppLoader
