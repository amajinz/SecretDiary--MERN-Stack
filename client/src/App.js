import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-quill/dist/quill.snow.css'
import { Provider } from 'react-redux'
import { loadUser } from './actions/authActions'
import store from './store'
import BaseRouter from './routes'

class App extends Component {
  componentDidMount () {
    store.dispatch(loadUser())
  }

  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <BaseRouter />
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
