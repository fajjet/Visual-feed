import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ChangePasswordForm from "./change-password-form";
import ProfileDataForm from "./profile-data-form";
import Session from "./profile-session";
import { logout as logoutFetch } from "utils/api";
import Styled from "./profile.style";
import { State } from "store/initialState";
import actions from "store/actions";
import { LogoutSelectionType } from "types";
import { toast } from "react-toastify";

interface Props {
  tokenId: string;
}

const Profile = (props: Props) => {
  const { tokenId } = props;
  const user = useSelector((state: State) => state.app.user);
  const dispatch = useDispatch();

  const logout = async (selection: LogoutSelectionType) => {
    const throwErr = () => {
      throw new Error("Internal server error");
    };
    try {
      const res = await logoutFetch(selection);
      const logoutCurrentSession = () => {
        if (res.status === 200) {
          dispatch(actions.setUser(undefined));
          location.replace("/");
        } else throwErr();
      };
      if (typeof selection === "object") {
        if (res.status === 200) {
          const user = (await res.json()).user;
          dispatch(actions.setUser(user));
        } else throwErr();
      } else {
        logoutCurrentSession();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const sortedSessions = user?.sessions?.sort((a, b) => {
    const tokenSubtraction =
      Number(b._id === tokenId) - Number(a._id === tokenId);
    return tokenSubtraction == 0
      ? (b.lastSeenDate || 0) - (a.lastSeenDate || 0)
      : tokenSubtraction;
  });

  return (
    <Styled.Root>
      <div className={"content-wrapper"}>
        <Styled.Head as={"section"}>
          <h1>Profile</h1>
          {user && <button onClick={(e) => logout("current")}>logout</button>}
        </Styled.Head>
        <hr />
        {!user && (
          <>
            <h4>You are not authorized too see this page</h4>
          </>
        )}
        {user && (
          <>
            <Styled.DataSection as={"section"}>
              <h4>Data</h4>
              <Styled.Role>
                <b>{user?.role}</b>
              </Styled.Role>
              <br />
              <div>
                <b>{user?.email}</b>
              </div>
              <br />
              <ProfileDataForm user={user} />
            </Styled.DataSection>
            <Styled.Sessions as={"section"}>
              <h4>Security</h4>
              <hr />
              <h5>Sessions</h5>
              <button onClick={(e) => logout("all")}>logout all</button>
              {sortedSessions?.map((session, i) => {
                return (
                  <Session
                    session={session}
                    index={i}
                    onLogoutClick={logout}
                    key={i}
                  />
                );
              })}
              <h5>Change password</h5>
              <ChangePasswordForm />
            </Styled.Sessions>
          </>
        )}
      </div>
    </Styled.Root>
  );
};

export default React.memo(Profile);
