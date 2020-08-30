import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { TextInput } from "components";
import { normalizeNameInput } from "utils";
import { updateUser } from "utils/api";
import actions from "store/actions";
import { User } from "types";

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
    } else {
      const err = response.error || response._message || 'Error';
      toast.error(err);
    }
  };

  return (
    <form name={'profile-form'} style={{ maxWidth: '20rem' }} onSubmit={onSubmit}>
      <TextInput
        label={'First name'}
        value={firstName}
        onChangeHandler={(value: string) => setFirstName(normalizeNameInput(value))}
        type={'text'}
        minLength={3}
        maxLength={30}
        required
      />
      <TextInput
        label={'Last name'}
        value={lastName}
        onChangeHandler={(value: string) => setLastName(normalizeNameInput(value))}
        type={'text'}
        minLength={3}
        maxLength={30}
        required
      />
      <br/>
      <button type={'submit'} disabled={!isModified}>save</button>
    </form>
  )
};

export default React.memo(ProfileDataForm);
