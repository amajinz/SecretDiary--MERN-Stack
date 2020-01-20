import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect } from 'react-redux'
import { deleteDiary } from '../actions/diaryActions'
import { PropTypes } from 'prop-types'

class DeleteDiaryModal extends Component {
  state = {
    modal: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object.isRequired,
    deleteDiary: PropTypes.func.isRequired,
    diaryID: PropTypes.string.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleDelete = e => {
    const { diaryID, history, isAuthenticated } = this.props
    if (!isAuthenticated) return
    this.props.deleteDiary(diaryID, history)
  };

  render () {
    return (
      <div>
        <Button onClick={this.toggle}>Delete</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Are you sure? </ModalHeader>
          <ModalBody>
            <Button
              color="danger"
              style={{ marginTop: '2rem' }}
              onClick={this.handleDelete}
              block
            >
              Yes, I want to delete this diary.
            </Button>
            <Button
              style={{ marginBottom: '2rem' }}
              onClick={this.toggle}
              block
            >
              No, I Do not want to delete it
            </Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteDiary })(
  withRouter(DeleteDiaryModal)
)
