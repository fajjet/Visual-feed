import React from 'react';

import Styled from './User.style';
import { User as UserType } from "types";

interface Props {
  data: UserType | null;
}

const User = (props: Props) => {
  const { fullName } = props.data || {};

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        {props.data !== null ? (
          <>
            <h1>{fullName}</h1>
            <hr/>
          </>
        ) : ( <h1>User not found</h1> )}
      </div>
    </Styled.Root>
  )
};

export default React.memo(User);
