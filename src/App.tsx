import React from 'react';
import { store } from './store/store';
import {Provider} from "react-redux";
import Layout from "./Layout";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
