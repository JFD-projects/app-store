import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { getGroupById } from '../../store/groups'

const Group = ({ id }) => {
  const group = useSelector(getGroupById(id))

  if (group) {
    return <>{group.name}</>
  } else {
    return 'Loading...'
  }
}

Group.propTypes = {
  id: PropTypes.string.isRequired
}

export default Group
