import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import BooksIndexContainer from "../containers/BooksIndexContainer";
import BookShowContainer from "../containers/BookShowContainer";
import UserShowContainer from "../containers/UserShowContainer";
import NytBooksListContainer from "../containers/NytBooksListContainer";

export const App = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={BooksIndexContainer} />
        <Route exact path="/books" component={BooksIndexContainer} />
        <Route exact path="/books/:id" component={BookShowContainer} />
        <Route exact path="/users/:id" component={UserShowContainer} />
        <Route exact path="/NytBooksList" component={NytBooksListContainer} />

      </Switch>
    </BrowserRouter>
  );
};

export default App;
