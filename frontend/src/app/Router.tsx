import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import { HomePage } from 'pages';
import { BuyTicketPage } from 'pages/BuyTicketPage';
import { NotFoundPage } from 'pages/NotFoundPage';

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
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
