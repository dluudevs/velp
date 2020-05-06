import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { fetchByBusiness } from './utils';
import SearchBar from './Components/Layout/SearchBar';

// Add linter. Do I need to look into webpack?
// Lint on commit

function App() {
  useEffect(() => {
    fetchByBusiness('food', 'toronto').then((results) => console.log(results));
    console.log(theme);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <h1>This is the Velp App</h1>
        <SearchBar />
      </ThemeProvider>
    </>
  );
}

export default App;
