import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { getGroupsLoadingStatus, getGroupById } from '../../store/groups'

const Group = ({ id }) => {
  const groupsIsLoading = useSelector(getGroupsLoadingStatus())
  const group = useSelector(getGroupById(id))

  if (!groupsIsLoading) {
    return <>{group.name}</>
  } else {
    return 'Loading...'
  }
}

Group.propTypes = {
  id: PropTypes.string.isRequired
}

export default Group
