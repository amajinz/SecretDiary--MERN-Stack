import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import SignupModal from './auth/SignupModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import PropTypes from 'prop-types'

class AppNavbar extends Component {
    state = {
      isOpen: false
    };

    static propTypes = {
      auth: PropTypes.object.isRequired
    };

    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    };

    render () {
      const { isAuthenticated, user } = this.props.auth

      const authLinks = (
        <React.Fragment>
          <NavItem>
            <span className='navbar-text mr-3'>
              {user && <p>Welcome back, {user.name}</p>}
            </span>
          </NavItem>
          <NavItem>
            <NavLink href="/new">Write Diary</NavLink>
          </NavItem>
          <NavItem>
            <Logout />
          </NavItem>
        </React.Fragment>
      )

      const guestLinks = (
        <React.Fragment>
          <NavItem>
            <LoginModal />
          </NavItem>

          <NavItem>
            <SignupModal />
          </NavItem>
        </React.Fragment>
      )

      return (
        <div>
          <Navbar color='dark' dark expand='sm' className='mb-5'>
            <Container>
              <NavbarBrand href='/'>Secret Diary</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className='ml-auto' navbar>
                  {isAuthenticated ? authLinks : guestLinks}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(AppNavbar)
