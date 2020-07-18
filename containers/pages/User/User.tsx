import React from 'react';

import { Posts } from "containers";
import Styled from './User.style';
import { User as UserType } from "types";

interface Props {
  data: UserType | null;
}

const User = (props: Props) => {
  const { data } = props;

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        {props.data !== null ? (
          <>
            <Styled.Head>
              <h1>{data?.fullName}</h1>
              <Styled.Role>{data?.role}</Styled.Role>
            </Styled.Head>
            <hr/>
            <section>
              <h4 style={{ color: 'steelblue' }}>User posts: {data?.posts?.length}</h4>
              {!!data?.posts?.length && (
                <Posts posts={data?.posts} view={'user'}/>
              )}
            </section>
          </>
        ) : ( <h1>User not found</h1> )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(User);
