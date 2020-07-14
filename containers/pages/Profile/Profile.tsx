import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Router from 'next/router';

import ChangePasswordForm from "./ChangePasswordForm";
import ProfileDataForm from './ProfileDataForm';
import Session from './ProfileSession';
import { logout as logoutFetch } from "utils/api";
import Styled from './Profile.style';
import { State } from "store/initialState";
import actions from 'store/actions';
import { LogoutSelectionType } from 'types';
import { IUserDocument } from "server/models/user";

interface Props {
  tokenId: string;
}

const Profile = (props: Props) => {
  const { tokenId } = props;
  const user = useSelector((state: State) => state.app.user);
  const dispatch = useDispatch();

  const logout = async (selection: LogoutSelectionType) => {
    try {
      const res = await logoutFetch(selection);
      const logoutCurrentSession = () => {
        if (res.status === 200) {
          dispatch(actions.setUser(undefined));
          Router.push('/');
        } else {
          throw new Error('Some error');
        }
      };
      if (typeof selection === 'object') {
        if (res.status === 200) {
          const user: IUserDocument = (await res.json()).user;
          dispatch(actions.setUser(user));
        } else {
          throw new Error('Some error');
        }
      } else {
        logoutCurrentSession();
      }
    } catch(err) {

    }
  };

  const sortedSessions = user?.sessions?.sort((a, b) => {
    return Number(b._id === tokenId) - Number(a._id === tokenId);
  });

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <Styled.Head as={'section'}>
          <h1>Profile</h1>
          {user && <button onClick={e => logout('current')}>logout</button>}
        </Styled.Head>
        <hr/>
        {!user && (
          <>
            <h4>You are not authorized too see this page</h4>
          </>
        )}
        {user && (
          <>
            <Styled.DataSection as={'section'}>
              <h4>Data</h4>
              <ProfileDataForm user={user}/>
            </Styled.DataSection>
            <Styled.Sessions as={'section'}>
              <h4>Security</h4>
              <hr/>
              <h5>Sessions</h5>
              <button onClick={e => logout('all')}>logout all</button>
              {sortedSessions?.map((session, i) => {
                return <Session session={session} index={i} onLogoutClick={logout} key={i} />
              })}
              <h5>Change password</h5>
              <ChangePasswordForm/>
            </Styled.Sessions>
          </>
        )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Profile);
