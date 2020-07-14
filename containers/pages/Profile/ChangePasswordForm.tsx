import React, { useState } from 'react';
// import { useDispatch } from "react-redux";

import { TextInput } from "components";

// import Styled from './Profile.style';


const ChangePasswordForm = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const dispatch = useDispatch();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form name={'password-form'} style={{ maxWidth: '20rem' }} onSubmit={onSubmit}>
      <TextInput
        label={'Current password'}
        value={currentPassword}
        onChange={(value: string) => setCurrentPassword(value)}
        type={'password'}
        minLength={6}
        required
      />
      <TextInput
        label={'New password'}
        value={newPassword}
        onChange={(value: string) => setNewPassword(value)}
        type={'password'}
        minLength={6}
        required
      />
      <br/>
      <button type={'submit'}>change</button>
    </form>
  )
};

export default React.memo(ChangePasswordForm);
