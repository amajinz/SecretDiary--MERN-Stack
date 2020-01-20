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
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { clearErrors } from '../../actions/errorActions'
import { signup } from '../../actions/authActions'

class SignupModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate (prevProps) {
    const { error } = this.props
    if (error !== prevProps.error) {
      if (error.id === 'SIGNUP_FAIL') {
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
    const { name, email, password, passwordConfirmation } = this.state
    const newUser = {
      name,
      email,
      password,
      passwordConfirmation
    }
    this.props.signup(newUser)
  };

  render () {
    const { msg } = this.state
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Signup
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Signup</ModalHeader>
          <ModalBody>
            {msg ? (
              typeof msg === 'object' ? (
                <Alert color="danger">
                  {msg.map(m => (
                    <p key={m}>- {m}</p>
                  ))}
                </Alert>
              ) : (
                <Alert color="danger">{msg}</Alert>
              )
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="passwordConfirmation">Password Confirmation</Label>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Signup
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

export default connect(mapStateToProps, { signup, clearErrors })(SignupModal)
