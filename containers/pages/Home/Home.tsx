import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SubmitPost } from "containers";
import Styled from './Home.style';
import { State } from "store/initialState";

const Home = () => {
  const user = useSelector((state: State) => state.app.user);
  const [submitFormIsActive, setSubmitFormIsActive] = useState(false);

  const onSubmitFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);
  };

  const onAddButtonClick = () => {
    if (!user) {
      toast.warn('You need to be authorized to create posts');
      return;
    }
    setSubmitFormIsActive(true);
  };

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Home page</h1>
        <hr/>
        <Styled.AddButton as={'button'} onClick={onAddButtonClick}>
          <span></span>
        </Styled.AddButton>
        {user && <SubmitPost onClose={onSubmitFormClose} user={user} isActive={submitFormIsActive}/>}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
