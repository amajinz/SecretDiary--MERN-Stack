import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { addDiary } from '../actions/diaryActions'
import { encryptContent } from '../encryption'

class CreateSecretModal extends Component {
  state = {
    modal: false,
    secret: '',
    secretConfirmation: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object.isRequired,
    diaryID: PropTypes.string,
    addDiary: PropTypes.func,
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleClick = () => {
    const { addDiary, history, body, title } = this.props
    const { secret } = this.state
    const encryptedBody = encryptContent(body, secret)
    addDiary({ title, body: encryptedBody }, history)
  };

  render () {
    const { secretConfirmation, secret } = this.state
    return (
      <div>
        <Button id="caret" onClick={this.toggle}>
          Save
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Enter your secret for this diary
          </ModalHeader>
          <ModalBody>
            <Alert color="danger">
              You can not retrieve this diary if you forget this secret!
            </Alert>
            <Input
              type="password"
              name="secret"
              placeholder="Enter a secret for this diary"
              id="secret"
              className="mb-3"
              onChange={this.onChange}
            />
            <Input
              type="password"
              name="secretConfirmation"
              placeholder="Confirm your secret"
              id="secretConfirmation"
              className="mb-3"
              onChange={this.onChange}
            />

            {secret === secretConfirmation ? (
              <Button
                style={{ marginTop: '2rem' }}
                onClick={this.handleClick}
                block
              >
                Create diary
              </Button>
            ) : (
              <Alert color="warning">Enter same secret twice</Alert>
            )}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default connect(null, { addDiary })(withRouter(CreateSecretModal))
