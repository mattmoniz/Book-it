import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

 import BooksIndexContainer from "../containers/BooksIndexContainer"
 import BookShowContainer from  "../containers/BookShowContainer"

export const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BooksIndexContainer}/>
        <Route exact path="/books/:id" component={BookShowContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
