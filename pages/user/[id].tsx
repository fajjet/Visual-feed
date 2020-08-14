import React from 'react';

import { User as UserType, CustomNextPageContext } from 'types';
import { User } from 'containers';
import absoluteUrl from "next-absolute-url";
import nodeFetch from "isomorphic-fetch";
import { Helmet } from "components";

interface Props {
  pageProps: {
    user: UserType | null;
  }
}

const UserPage = (props: Props) => {
  const { user } = props.pageProps;
  return (
    <>
      <Helmet title={(user ? 'User: ' + user.fullName : 'User not found')}/>
      <User data={user}/>
    </>
  )
};

export const getServerSideProps = async (context: CustomNextPageContext) => {
  const props = { user: null };
  if (context.req) {
    const id = context.query.id;
    const { origin } = absoluteUrl(context.req);
    const res = await nodeFetch(origin + '/api/users/user/' + id, { method: 'GET' });
    if (res.status === 200) {
      const response = await res.json();
      props.user = response?.user;
    }
  }
  return { props };
};


export default React.memo(UserPage);
