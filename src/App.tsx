import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import routes from './routes';
import { createTheme } from './theme';

const App: FC = () => {
  const content = useRoutes(routes);
  const theme = createTheme({
    theme: 'LIGHT'
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={3}
      >
        <GlobalStyles />
        {content}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
