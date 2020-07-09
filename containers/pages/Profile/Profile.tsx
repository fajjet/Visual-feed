import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Router from 'next/router';

import Styled from './Profile.style';
import { State } from "store/initialState";
import actions from 'store/actions';

interface Props {
  tokenId: string;
}

const Profile = (props: Props) => {
  const { tokenId } = props;
  const user = useSelector((state: State) => state.app.user);
  const dispatch = useDispatch();

  const logout = async () => {
    const res = await fetch('/api/users/logout', { method: 'POST' });
    if (res.status === 200) {
      await dispatch(actions.setUser(false));
      Router.push('/');
    }
  };

  const sortedTokens = user?.tokens?.sort((a, b) => {
    return Number(b._id === tokenId) - Number(a._id === tokenId);
  });

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <Styled.Head>
          <h1>Profile</h1>
          {user && <button onClick={logout}>logout</button>}
        </Styled.Head>
        {!user && (
          <>
            <h4>You are not authorized too see this page</h4>
          </>
        )}
        {user && (
          <>
            <Styled.DataSection>
              <h4>Data</h4>
              <Styled.DataItem>{user.fullName}</Styled.DataItem>
              <Styled.DataItem>{user.email}</Styled.DataItem>
            </Styled.DataSection>
            <Styled.Sessions>
              <Styled.Flex>
                <h4>Active sessions</h4>
                <button style={{ marginLeft: '1rem' }}>remove all</button>
              </Styled.Flex>
              {sortedTokens?.map(({ ip = '', uag = '', city = '', lastSeenDate }, i) => {
                return (
                  <>
                    <Styled.Session key={ip + uag + city}>
                      <Styled.SessionHead>
                        <span><b>City:</b> {city} <b>IP:</b> {ip}</span>
                        <button
                          style={{ marginLeft: '1rem' }}
                        >remove</button>
                        {!i && <span
                          style={{ color: 'green', fontWeight: 500, paddingLeft: '1rem' }}
                        >current</span>}
                      </Styled.SessionHead>
                      {(!!i && lastSeenDate) && (<div style={{
                        fontSize: '0.85rem', paddingTop: '0.15rem'
                      }}><b>Last seen:</b> {lastSeenDate}</div>)}
                      <div style={{ fontSize: '0.7rem', paddingTop: '0.25rem' }}>{uag}</div>
                    </Styled.Session>
                  </>
                )
              })}
            </Styled.Sessions>
          </>
        )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Profile);
