import React, { useState } from 'react';
import { NextComponentType } from "next";
import { toast } from "react-toastify";

import { updateUserPassword } from "utils/api";
import { TextInput } from "components";

const ChangePasswordForm: NextComponentType = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const dispatch = useDispatch();

  const arePasswordsEqual = currentPassword === newPassword;

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (arePasswordsEqual) return;
    const res = await updateUserPassword({ currentPassword, newPassword });
    const response = await res.json();
    if (res.status === 200) {
      toast.success('New password successfully applied');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      toast.error(response.error);
    }
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
      <button type={'submit'} disabled={arePasswordsEqual}>change</button>
    </form>
  )
};

export default React.memo(ChangePasswordForm);
