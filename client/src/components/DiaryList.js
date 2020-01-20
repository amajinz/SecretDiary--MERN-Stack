import React, { Component } from 'react'
import { Container, ListGroup, Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'
import { getDiaries } from '../actions/diaryActions'
import PropTypes from 'prop-types'
import DiaryListItem from './DiaryListItem'

class DiaryList extends Component {
  componentDidMount () {
    this.props.getDiaries()
  }

  render () {
    const { diaries } = this.props.diary
    const { isAuthenticated } = this.props.auth
    const userDisplay = (
      <ListGroup>
        {diaries.length === 0 && (
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Write your first diary.</h1>
            </Container>
          </Jumbotron>
        )}
        {diaries &&
          diaries.map(diary => {
            return <DiaryListItem diary={diary} key={diary._id} />
          })}
      </ListGroup>
    )

    const guestDisplay = (
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Encrypted Diary</h1>
          <p className="lead">Login to start!</p>
        </Container>
      </Jumbotron>
    )
    return (
      <Container>{isAuthenticated ? userDisplay : guestDisplay}</Container>
    )
  }
}

DiaryList.propTypes = {
  getDiaries: PropTypes.func.isRequired,
  diary: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  diary: state.diary,
  auth: state.auth
})

export default connect(mapStateToProps, { getDiaries })(DiaryList)
