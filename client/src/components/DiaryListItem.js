import React, { useState } from 'react'
import { ListGroupItem, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const DiaryListItem = props => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <ListGroupItem tag="a" href="#" action style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                {`${new Date(props.diary.date).toLocaleDateString()} - ${props.diary.title}`}
            </div>
            <ButtonDropdown isOpen={open} toggle={toggle} size='sm' className="mr">
                <Button id="caret" >View</Button>
                <DropdownToggle caret />
                <DropdownMenu>
                    <DropdownItem >Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </ListGroupItem>
    )
}

export default DiaryListItem