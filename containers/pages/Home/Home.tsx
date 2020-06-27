import React, { useEffect } from 'react';
import { SignUp } from 'containers';
// import { IMovie } from 'server/models/user';

import Styled from './Home.style';

interface Props {

}

const Home = (props: Props) => {
  useEffect(() => {
   fetch('/api/users', {
     method: 'POST',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify({
       firstName: 'John',
       lastName: 'Wilson',
       email: 'test@example.com',
       password: '123',
     }),
   }).then(res => {
    console.log(res)
   });
  }, []);

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <SignUp/>
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
