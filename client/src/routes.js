import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import DiaryList from './components/DiaryList'
import DiaryView from './components/DiaryView'
import NewDiary from './components/NewDiary'
import EditDiary from './components/EditDiary'

const BaseRouter = () => (
  <div>
    <Nav />
    <Route exact path="/" component={DiaryList} />
    <Route exact path="/diary/:id/edit" component={EditDiary} />
    <Route exact path="/diary/:id" component={DiaryView} />
    <Route exact path="/new" component={NewDiary} />
  </div>
)

export default BaseRouter
