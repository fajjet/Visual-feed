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
import {NextComponentType} from "next";

const MyApp = (props: AppProps) => {
  const { Component, router, pageProps } = props;
  const key = router.asPath;
  const authFromClientPassed = useRef(false);

  const propsPackage = {
    pageProps,
  };

  const auth = async () => {
    // provide token validation, in case if invalid delete it
    const lastSeenDate = new Date().getTime();
    fetch('/api/users/me', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ nextShouldBeCalled: true, isClient: true, lastSeenDate }),
    })
  };

  if (!authFromClientPassed.current && process.browser) {
    authFromClientPassed.current = true;
    auth();
  }

  return (
    <>
      <Page>
        <Component {...propsPackage} key={key}/>
      </Page>
    </>
  )
};

MyApp.getInitialProps = async ({ ctx, Component } : { ctx: any, Component: NextComponentType }) => {
  if (ctx.req && !process.browser) {
    const { token } = ctx.req.cookies;
    const { origin } = absoluteUrl(ctx.req);
    const res = await nodeFetch(origin + '/api/users/me', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token, nextShouldBeCalled: true }),
    });
    if (res.status === 200) {
      const user = await res.json();
      ctx.store.dispatch(actionsCreators.setUser(user));
    } else {
      ctx.store.dispatch(actionsCreators.setUser(undefined));
    }
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
  };
};

export default wrapper.withRedux(MyApp);

