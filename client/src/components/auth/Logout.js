import React, { Component } from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { clearDiary } from '../../actions/diaryActions'
import PropTypes from 'prop-types'

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    clearDiary: PropTypes.func.isRequired
  };

  render () {
    return (
      <NavLink
        onClick={() => {
          this.props.logout()
          this.props.clearDiary()
        }}
        href="#"
      >
        Logout
      </NavLink>
    )
  }
}

export default connect(null, { logout, clearDiary })(Logout)
