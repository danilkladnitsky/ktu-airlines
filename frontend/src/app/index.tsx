import React from 'react';

import { Button, MantineProvider } from '@mantine/core';

import { MANTINE_THEME } from 'shared/theme';

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={MANTINE_THEME}
    >
      <Button>App</Button>
    </MantineProvider>
  );
}

export default App;