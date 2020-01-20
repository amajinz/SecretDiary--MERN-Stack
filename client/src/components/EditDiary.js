import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Jumbotron } from 'reactstrap'
import DiaryEditor from './DiaryEditor'
import { getDiary } from '../actions/diaryActions'
import PropTypes from 'prop-types'

class EditDiary extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    getDiary: PropTypes.func,
    diary: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount () {
    const {
      match: { params }
    } = this.props
    this.props.getDiary(params.id)
  }

  render () {
    const { diary, isAuthenticated } = this.props
    if (!isAuthenticated) {
      return (
        <Container>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Encrypted Diary</h1>
              <p className="lead">Login to start!</p>
            </Container>
          </Jumbotron>
        </Container>
      )
    }

    return (
      <div>
        <Container>
          <h2>Edit diary</h2>
        </Container>
        {isAuthenticated ? (
          <DiaryEditor diary={diary} action="edit" />
        ) : (
          <p>Please login</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  diary: state.diary.diary,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => {
  return {
    getDiary: id => dispatch(getDiary(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditDiary))
