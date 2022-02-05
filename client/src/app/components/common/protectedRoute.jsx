import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getUserIsAdmin } from '../../store/user'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isAdmin = useSelector(getUserIsAdmin())

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAdmin) {
          return <Redirect to="/" />
        }

        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProtectedRoute
