import { useEffect } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import drizzleOptions from '../../Drizzle/drizzleOptions';
import theme from '../Toolkit/theme';
import './styles/global.scss';
import './Tanda.css';
import './Wallets.css';

const drizzle = new Drizzle(drizzleOptions);

function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <ThemeProvider theme={theme}>
        <DrizzleContext.Consumer>
          {
            (drizzleContext) => {
              // eslint-disable-next-line no-shadow
              const { drizzle, drizzleState, initialized } = drizzleContext;
              return (
                <>
                  <CssBaseline />
                  <Component {...pageProps} drizzle={drizzle} drizzleState={drizzleState} initialized={initialized} />
                </>
              );
            }
          }
        </DrizzleContext.Consumer>
      </ThemeProvider>
    </DrizzleContext.Provider>
  );
}

export default App;
