import React, { useRef }  from 'react';
import { AppProps } from 'next/app';
import absoluteUrl from 'next-absolute-url'
// @ts-ignore
import nodeFetch from 'isomorphic-fetch';
import actionsCreators from 'store/actions';

import { wrapper } from 'store';
import { Page } from 'containers';

import 'normalize.css';
import 'styles/global.css';
import 'styles/fonts.css';

const MyApp = (props: AppProps) => {
  const { Component, router } = props;
  const key = router.asPath;
  const authFromClientPassed = useRef(false);

  const auth = async () => {
    fetch('/api/users/me', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ isInitialAuth: true }),
    })
  };

  if (!authFromClientPassed.current && process.browser) {
    authFromClientPassed.current = true;
    auth();
  }

  return (
    <>
      <Page>
        <Component key={key}/>
      </Page>
    </>
  )
};

MyApp.getInitialProps = async ({ ctx } : { ctx: any }) => {
  if (ctx.req && !process.browser) {
    const { token } = ctx.req.cookies;
    const { origin } = absoluteUrl(ctx.req);
    const res = await nodeFetch(origin + '/api/users/me', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token, isInitialAuth: true }),
    });
    if (res.status === 200) {
      const user = await res.json();
      ctx.store.dispatch(actionsCreators.setUser(user));
    } else {
      ctx.store.dispatch(actionsCreators.setUser(false));
    }
  }
  return true;
};

export default wrapper.withRedux(MyApp);

