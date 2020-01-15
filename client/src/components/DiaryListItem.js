// this is an element in DiaryList.

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ListGroupItem, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const DiaryListItem = props => {
  const [open, setOpen] = useState(false)
  const { diary } = props
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <ListGroupItem tag="a" href="#" action style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        {`${new Date(diary.date).toLocaleDateString()} - ${diary.title}`}
      </div>
      <ButtonDropdown isOpen={open} toggle={toggle} size='sm' className="mr">
        <Link to={`/diary/${diary._id}`}><Button id="caret" >View</Button></Link>
        <DropdownToggle caret />
        <DropdownMenu>
          <DropdownItem >Edit</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ListGroupItem>
  )
}

DiaryListItem.propTypes = {
  diary: PropTypes.object.isRequired
}

export default DiaryListItem
