import React from 'react';

import { timeSince } from "utils";
import { LogoutSelectionType, Session } from "types";
import Styled from './Profile.style';


interface Props {
  session: Session;
  index: number;
  onLogoutClick(selection: LogoutSelectionType): void;
}

const ProfileSession = (props: Props) => {
  const {
    session: { ip = '', uag = '', city = '', _id, lastSeenDate },
    onLogoutClick,
    index: i,
  } = props;

  const date = process.browser && lastSeenDate && timeSince(new Date(lastSeenDate).getTime());

  return (
    <Styled.Session>
      <Styled.SessionHead>
        <span>
          <b>City:</b> {(city || 'unknown') + ' '}
          <b>IP:</b> {ip}
        </span>
        <button
          style={{ marginLeft: '1rem' }}
          onClick={() => onLogoutClick(!i ? 'current' : { id: _id })}
        >logout</button>
        {!i && <span
          style={{ color: 'green', fontWeight: 500, paddingLeft: '1rem' }}
        >current</span>}
      </Styled.SessionHead>
      {(!!i && date) && (<div style={{
        fontSize: '0.85rem', paddingTop: '0.15rem'
      }}><b>Last seen</b> {date} ago</div>)}
      <pre style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>{uag}</pre>
    </Styled.Session>
  )
};

export default React.memo(ProfileSession);
