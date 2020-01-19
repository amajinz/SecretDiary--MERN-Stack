// this is an element in DiaryList.

import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  ListGroupItem,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DiaryListItem = props => {
  const [open, setOpen] = useState(false);
  const { diary } = props;
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <ListGroupItem
      action
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        {`${new Date(diary.date).toLocaleDateString()} - ${diary.title}`}
      </div>
      <ButtonDropdown isOpen={open} toggle={toggle} size="sm" className="mr">
        <Button href={`/diary/${diary._id}`} id="caret">
          View
        </Button>
        <DropdownToggle caret />
        <DropdownMenu>
          <DropdownItem href={`/diary/${diary._id}/edit`}>Edit</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </ListGroupItem>
  );
};

DiaryListItem.propTypes = {
  diary: PropTypes.object.isRequired
};

export default DiaryListItem;
