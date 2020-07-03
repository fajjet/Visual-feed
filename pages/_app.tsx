import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { Router } from 'next/router';
import absoluteUrl from 'next-absolute-url'
// @ts-ignore
import fetch from 'isomorphic-fetch';
import AppStoreTypes from 'store/app/types';

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

App.getInitialProps = async (context: any) => {
  const ctx = context.ctx;
  const reduxStore = ctx?.store?.getState() || {};
  if (!ctx.req || reduxStore?.app?.user !== null) return false;
  const { origin } = absoluteUrl(ctx.req);
  const res = await fetch(origin + '/api/users/me', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ token: ctx.req.cookies.token }),
  });
  if (res.status === 200) {
    const user = await res.json();
    ctx.store.dispatch({ type: AppStoreTypes.SET_USER, payload: { user } });
    return true;
  }
  return true;
};

// @ts-ignore
export default withRedux(initStore)(App);
