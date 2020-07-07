import React from 'react';
import { useSelector } from "react-redux";
import Link from 'next/link';

import Styled from './Profile.style';
import { State } from "store/initialState";

interface Props {

}

const Home = (props: Props) => {
  const user = useSelector((state: State) => state.app.user);

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Profile</h1>
        {!user && (
          <>
            <h4>You are not authorized too see this page</h4>
            <Link href={'/signin'} passHref>
              <Styled.Link as={'a'}>Sign in</Styled.Link>
            </Link>
            <Link href={'/signup'} passHref>
              <Styled.Link as={'a'}>Sign up</Styled.Link>
            </Link>
          </>
        )}
        {user && (
          <>
            <Styled.DataSection>
              <h4>Data</h4>
              <Styled.DataItem>{user.firstName} {user.lastName}</Styled.DataItem>
              <Styled.DataItem>{user.email}</Styled.DataItem>
            </Styled.DataSection>
            <Styled.DataSection>
              <h4>Active sessions</h4>
              {user?.tokens?.map(el => {
                return (
                  <Styled.DataItem>
                    <span><b>{el.city}</b>: {el.ip}</span>
                    <Styled.DeleteSession>remove</Styled.DeleteSession>
                  </Styled.DataItem>
                )
              })}
            </Styled.DataSection>
          </>
        )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
