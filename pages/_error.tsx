import React from 'react';

import { Error } from 'containers';
import { Helmet } from "components";
import {NextPageContext} from "next";

interface Props{
  pageProps: {
    statusCode: number;
  }
}

const ErrorPage = (props: Props) => {
  return (
    <>
      <Helmet title={'Error'}/>
      <Error statusCode={props.pageProps.statusCode}/>
    </>
  )
};

export const getServerSideProps = async (context: NextPageContext) => {
  return { props: { statusCode: context.res?.statusCode } };
};

export default ErrorPage;
