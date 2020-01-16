import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup,
  Container,
  Collapse,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Nav,
  Navbar,
  NavbarToggler
} from "reactstrap";
import PropTypes from "prop-types";
import { getDiary } from "../actions/diaryActions";
import DeleteDiaryModal from "./DeleteDiaryModal";

class DiaryView extends React.Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getDiary: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getDiary(params.id);
  }

  render() {
    const { diary } = this.props;
    const {
      match: { params }
    } = this.props;

    return (
      <Container>
        {diary && (
          <Card>
            <Navbar light expand="sm" className="mt-2 mr-0">
              <NavbarToggler
                className="view-function-toggle"
                onClick={this.toggle}
              />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <ButtonGroup>
                    <Link to={`${params.id}/edit`}>
                      <Button diaryID={params.id}>Edit</Button>
                    </Link>
                    <Link to="#">
                      <DeleteDiaryModal diaryID={params.id} />
                    </Link>
                    <Link to="/">
                      <Button>Home</Button>
                    </Link>
                  </ButtonGroup>
                </Nav>
              </Collapse>
            </Navbar>
            <CardBody>
              <p>
                {new Date(diary.date).toDateString()}{" "}
                {new Date(diary.date).toLocaleTimeString()}
              </p>

              <CardTitle className="diary-title">{diary.title}</CardTitle>
              <CardText>
                <div dangerouslySetInnerHTML={{ __html: diary.body }} />
              </CardText>
            </CardBody>
          </Card>
        )}
      </Container>
    );
  }
}

DiaryView.propTypes = {
  diary: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchDiary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  diary: state.diary.diary,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    getDiary: id => dispatch(getDiary(id))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DiaryView)
);
