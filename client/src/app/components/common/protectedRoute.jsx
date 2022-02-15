import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getUserIsAdmin, getUserIsLoggedIn } from '../../store/user'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isAdmin = useSelector(getUserIsAdmin())
  const isLoggedIn = useSelector(getUserIsLoggedIn())

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }} />
        }
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
