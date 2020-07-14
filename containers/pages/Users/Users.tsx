import React from 'react';

import Styled from './Users.style';

const Users = () => {
  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Users</h1>
        <hr/>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Users);
