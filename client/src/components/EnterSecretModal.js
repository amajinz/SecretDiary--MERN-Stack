import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { getSecret } from '../actions/diaryActions'
import { PropTypes } from 'prop-types'

class EnterSecretModal extends Component {
  state = {
    modal: false,
    secret: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object.isRequired,
    diaryID: PropTypes.string,
    diary: PropTypes.object.isRequired,
    getSecret: PropTypes.func.isRequired
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
    const { diary, getSecret, history } = this.props
    getSecret(diary._id, this.state.secret, history)
  };

  render () {
    return (
      <div>
        <Button id="caret" onClick={this.toggle}>
          View
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {' '}
            Enter your secret for this diary{' '}
          </ModalHeader>
          <ModalBody>
            <Input
              type="password"
              name="secret"
              id="secret"
              className="mb-3"
              onChange={this.onChange}
            />
            <Button
              style={{ marginTop: '2rem' }}
              onClick={this.handleClick}
              block
            >
              {/* href={`/diary/${diary._id}`} */}
              See Diary
            </Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default connect(null, { getSecret })(withRouter(EnterSecretModal))
