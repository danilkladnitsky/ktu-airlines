import React from 'react';

import { HomePage } from 'pages';
import {
  Route,
  BrowserRouter,
} from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route>
        <HomePage />
      </Route>
    </BrowserRouter>
  );
};
