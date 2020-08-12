import React from 'react';
import { Users } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";
import { User } from "types";
import { Helmet } from "../components";
import { NextPageContext } from "next";

interface Props {
  pageProps: {
    users: User[] | null;
  }
}

const UsersPage = (props: Props) => {
  return (
    <>
      <Helmet title={'Users'}/>
      <Users users={props.pageProps.users}/>
    </>
  )
};

export const getServerSideProps = async (context: NextPageContext) => {
  let users = null;
  if (context.req) {
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/users', { method: 'GET' });
    const response = await res.json();
    users = response?.users;
  }
  return { props: { users } };
};

export default UsersPage;
