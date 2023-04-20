import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import { HomePage } from 'pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route>
        <HomePage />
      </Route>
    </BrowserRouter>
  );
};
