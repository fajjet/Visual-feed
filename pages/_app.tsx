import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Router } from 'next/router';

import{ initStore } from 'store';
import { Page } from 'containers';

import 'normalize.css';
import 'styles/global.css';
import 'styles/fonts.css';

interface Props extends AppProps {
  store: any;
  router: Router;
}

const App = (props: Props) => {
  const { Component, pageProps, store, router } = props;
  const key = router.asPath;

  return (
    <>
      <Provider store={store}>
        <Page>
          <Component {...pageProps} key={key}/>
        </Page>
      </Provider>
    </>
  )
};

// @ts-ignore
export default withRedux(initStore)(App);
