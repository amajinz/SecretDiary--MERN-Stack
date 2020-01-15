import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Nav from './components/Nav'
import DiaryList from './components/DiaryList'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import store from './store'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Nav />
          <DiaryList />
        </div>
      </Provider>
    );
  }
}

export default App;
