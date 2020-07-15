import React from 'react';
import { useSelector } from "react-redux";

import Link from 'next/link';
import Styled from './Users.style';
import { User } from "types";
import {State} from "store/initialState";

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
        <hr/>
        <br/>
        <section>
          <ul>
            {sortedUsers?.map(({ _id: id, fullName })  => {
              return (
                <Link href={'/user/[id]'} as={`/user/${id}`} passHref>
                  <Styled.Item as={'a'} key={id}>
                    <Styled.ItemAvatar/>
                    {fullName}
                    {id === user?._id && (<Styled.ItemSelf>{'you'}</Styled.ItemSelf>)}
                  </Styled.Item>
                </Link>
              );
            })}
          </ul>
        </section>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Users);
