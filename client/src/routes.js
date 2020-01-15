import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import DiaryList from './components/DiaryList'
import DiaryView from './components/DiaryView'
import DiaryEditor from './components/DiaryEditor'

const BaseRouter = () => (
  <div>
    <Nav />
    <Route exact path="/" component={DiaryList} />
    <Route exact path="/diary/:id" component={DiaryView} />
    <Route exact path="/new" component={DiaryEditor} />
  </div>
)

export default BaseRouter
