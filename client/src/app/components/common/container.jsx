import React from 'react'

import PropTypes from 'prop-types'

const Container = ({ children }) => {
  return <div className="container">{children}</div>
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default Container
