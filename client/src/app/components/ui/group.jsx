import PropTypes from 'prop-types'
import React from 'react'
import { useGroups } from '../../hooks/useGroups'

const Group = ({ id }) => {
  const { isLoading, getGroupById } = useGroups()
  console.log(id)
  const group = getGroupById(id)

  if (!isLoading) {
    return <>{group.name}</>
  } else {
    return 'Loading...'
  }
}

Group.propTypes = {
  id: PropTypes.string.isRequired
}

export default Group
