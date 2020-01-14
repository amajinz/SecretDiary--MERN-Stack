import React, { Component } from 'react'
import { Container, ListGroup } from 'reactstrap'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { getDiaries } from '../actions/diaryActions'
import PropTypes from 'prop-types'
import DiaryListItem from './DiaryListItem'

class DiaryList extends Component {
    componentDidMount() {
        this.props.getDiaries()
    }

    render() {
        const { diaries } = this.props.diary
        return (
            <Container>
                <ListGroup>
                    {diaries && diaries.map(diary => {
                        return (
                            <CSSTransition key={diary._id} timeout={500} classNames="fade">
                                <DiaryListItem diary={diary} />
                            </CSSTransition>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }
}

DiaryList.propTypes = {
    getDiaries: PropTypes.func.isRequired,
    diary: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    diary: state.diary
})



export default connect(mapStateToProps, { getDiaries })(DiaryList)