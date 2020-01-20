import React, { Component } from 'react'
import { Container, Jumbotron } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DiaryEditor from './DiaryEditor'
import PropTypes from 'prop-types'

class NewDiary extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render () {
    const { isAuthenticated } = this.props

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
          <h2>Write new diary</h2>
        </Container>
        <DiaryEditor action="create" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(withRouter(NewDiary))
