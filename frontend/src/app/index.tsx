import React from 'react';
import { MantineProvider } from '@mantine/core';

import { MANTINE_THEME } from 'shared/theme';

import { AppRouter } from './Router';

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={MANTINE_THEME}
    >
      <AppRouter />
    </MantineProvider>
  );
}

export default App;
