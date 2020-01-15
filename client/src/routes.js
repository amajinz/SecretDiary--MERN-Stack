import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import DiaryList from './components/DiaryList'
import DiaryView from './components/DiaryView'

const BaseRouter = () => (
  <div>
    <Nav />
    <Route exact path="/" component={DiaryList} />
    <Route exact path="/diary/:id" component={DiaryView} />
  </div>
)

export default BaseRouter
