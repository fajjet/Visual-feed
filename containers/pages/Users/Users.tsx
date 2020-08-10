import React from 'react';
import {useSelector} from "react-redux";

import { Card } from 'components';
import Link from 'next/link';
import Styled from './Users.style';
import { User } from "types";
import { State } from "store/initialState";

interface Props {
  users: User[] | null;
}

const Users = (props: Props) => {
  const { users } = props;
  const user = useSelector((state: State) => state.app.user);
  const sortedUsers = users?.sort((a, b) => Number(a.fullName?.localeCompare(b.fullName || '')));

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Users</h1>
        <section>
          {!!sortedUsers?.length ? (
            <ul>
              {sortedUsers.map(({ _id: id, fullName, role })  => {
                return (
                  <Link href={'/user/[id]'} as={`/user/${id}`} passHref>
                    <Styled.Item as={'a'}>
                      <Card>
                        <Styled.ItemInner>
                          <Styled.ItemLeft>
                            <Styled.ItemAvatar/>
                            {fullName}
                            {id === user?._id && (<Styled.ItemSelf>{'you'}</Styled.ItemSelf>)}
                          </Styled.ItemLeft>
                          <div style={{ fontSize: '0.9rem' }}>{role}</div>
                        </Styled.ItemInner>
                      </Card>
                    </Styled.Item>
                  </Link>
                );
              })}
            </ul>
          ) : (
            <h5>There are no existing users here yet</h5>
          )}
        </section>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Users);
