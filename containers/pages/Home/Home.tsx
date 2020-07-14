import React from 'react';

import Styled from './Home.style';

interface Props {

}

const Home = (props: Props) => {
  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Home page</h1>
        <hr/>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
