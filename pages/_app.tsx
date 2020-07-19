import React, { useRef }  from 'react';
import { AppProps } from 'next/app';
import absoluteUrl from 'next-absolute-url'
import nodeFetch from 'isomorphic-fetch';
import actionsCreators from 'store/actions';
import { ToastContainer } from 'react-toastify';
import Head from "next/head";

import { wrapper } from 'store';
import { Page } from 'containers';

import 'react-toastify/dist/ReactToastify.css';
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
    fetch('/api/users/me', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ nextShouldBeCalled: true, isClient: true }),
    })
  };

  if (!authFromClientPassed.current && process.browser) {
    authFromClientPassed.current = true;
    auth();
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
      </Head>
      <Page>
        <Component {...propsPackage} key={key}/>
        <ToastContainer/>
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

