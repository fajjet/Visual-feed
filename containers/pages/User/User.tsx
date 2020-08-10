import React from 'react';

import { Card } from 'components';
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
            <Card noPadding={false}>
              <Styled.Head>
                <h1>{data?.fullName}</h1>
                <Styled.Role>{data?.role}</Styled.Role>
              </Styled.Head>
            </Card>
            <Styled.Posts>
              {!!data?.posts?.length && (
                <Posts posts={data?.posts} view={'user'}/>
              )}
            </Styled.Posts>
          </>
        ) : ( <h1>User not found</h1> )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(User);
