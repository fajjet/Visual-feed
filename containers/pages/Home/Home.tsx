import React, { useEffect } from 'react';

import Styled from './Home.style';

interface Props {

}

const Home = (props: Props) => {

  useEffect(() => {
    fetch('/api/users/test', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).then(res => {
      console.log(res)
    });

  }, []);

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Home page</h1>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
