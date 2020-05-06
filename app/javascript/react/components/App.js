import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

 import BooksIndexContainer from "../containers/BooksIndexContainer"

export const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BooksIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
