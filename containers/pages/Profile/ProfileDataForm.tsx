import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { TextInput } from "components";
import { User } from "types";
import { normalizeNameInput } from "utils";
import { updateUser } from "utils/api";
import actions from "store/actions";

// import Styled from './Profile.style';


interface Props {
  user: User;
}

const ProfileDataForm = (props: Props) => {

  const { user } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(normalizeNameInput(user.firstName));
    setLastName(normalizeNameInput(user.lastName));
  }, [user]);

  const isModified = user && (firstName.toLowerCase() !== user.firstName || lastName.toLowerCase() !== user.lastName);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateUser({ firstName, lastName });
    const response = await res.json();
    if (res.status === 200) {
      dispatch(actions.setUser(response.user));
      toast.success('Changes saved');
    }
  };

  return (
    <form name={'profile-form'} style={{ maxWidth: '20rem' }} onSubmit={onSubmit}>
      <TextInput
        label={'First name'}
        value={firstName}
        onChange={(value: string) => setFirstName(normalizeNameInput(value))}
        type={'text'}
        minLength={3}
        required
      />
      <TextInput
        label={'Last name'}
        value={lastName}
        onChange={(value: string) => setLastName(normalizeNameInput(value))}
        type={'text'}
        minLength={3}
        required
      />
      <br/>
      <button type={'submit'} disabled={!isModified}>save</button>
    </form>
  )
};

export default React.memo(ProfileDataForm);
