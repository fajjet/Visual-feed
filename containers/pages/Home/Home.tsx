import React from 'react';
import { useSelector } from "react-redux";

import { SubmitPost } from "containers";
import Styled from './Home.style';
import { State } from "store/initialState";

const Home = () => {
  const user = useSelector((state: State) => state.app.user);

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Home page</h1>
        <hr/>
        {user && <SubmitPost user={user}/>}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
