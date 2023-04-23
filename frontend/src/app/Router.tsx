import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import { BuyTicketPage, CheckPage, HomePage, NotFoundPage } from 'pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/buy-ticket" exact>
          <BuyTicketPage />
        </Route>
        <Route path="/confirm-booking" exact>
          <CheckPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
