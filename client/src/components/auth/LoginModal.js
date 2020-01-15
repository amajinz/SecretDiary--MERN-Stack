import React, { Component } from 'react'
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink
} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearErrors } from '../../actions/errorActions'
import { login } from '../../actions/authActions'

class LoginModal extends Component {
    state = {
      modal: false,
      email: '',
      password: '',
      msg: null
    };

    static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    }

    componentDidUpdate (prevProps) {
      const { error } = this.props
      if (error !== prevProps.error) {
        if (error.id === 'LOGIN_FAIL') {
          this.setState({ msg: error.msg.msg })
        } else {
          this.setState({ msg: null })
        }
      }

      if (this.state.modal) {
        if (this.props.isAuthenticated) {
          this.toggle()
        }
      }
    }

    toggle = () => {
      this.props.clearErrors()
      this.setState({
        modal: !this.state.modal
      })
    };

    onChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = e => {
      e.preventDefault()
      const { history } = this.props
      const { email, password } = this.state
      const user = {
        email,
        password
      }
      this.props.login(user, history)
    };

    render () {
      const { msg } = this.state
      return (
        <div>
          <NavLink onClick={this.toggle} href='#'>
                    Login
          </NavLink>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            <ModalBody>
              {msg ? <Alert color='danger'>{msg}</Alert> : null}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>

                  <Label for='email'>Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    className='mb-3'
                    onChange={this.onChange}
                  />
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    className='mb-3'
                    onChange={this.onChange}
                  />

                  <Button color='dark' style={{ marginTop: '2rem' }} block>
                                    Login
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(withRouter(LoginModal))
