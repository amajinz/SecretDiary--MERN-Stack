// this is an element in DiaryList.

import React from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import { getSecret } from '../actions/diaryActions'
import EnterSecretModal from './EnterSecretModal'

const DiaryListItem = props => {
  const { diary } = props

  return (
    <ListGroupItem
      action
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div style={{ overflowX: 'scroll' }}>
        {`${new Date(diary.date).toLocaleDateString()} - ${diary.title}`}
      </div>
      <EnterSecretModal diary={diary} className="mr" />
    </ListGroupItem>
  )
}

DiaryListItem.propTypes = {
  diary: PropTypes.object.isRequired,
  getSecret: PropTypes.func
}

export default connect(null, { getSecret })(DiaryListItem)
