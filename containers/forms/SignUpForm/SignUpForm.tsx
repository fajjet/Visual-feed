import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { TextInput, Button } from 'components';
import { createUser, getUserTrace } from "utils/api";
import Styled from './SignUpForm.style';
import actions from 'store/actions';
import {IUser} from "../../../server/models/user";

interface Response {
  user?: IUser;
  error?: string;
}

const SignUpForm = () => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [status, setStatus] = useState<null | number>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    const trace = await getUserTrace();
    const res = await createUser(user, trace);
    const response: Response = await res.json();
    if (res.status === 201) {
      if (error) setError(undefined);
      const user = response.user;
      dispatch(actions.setUser(user));
    } else {
      setError(response.error);
    }
    setStatus(res.status);
  };

  return (
    <Styled.Root as={'form'} onSubmit={onSubmit}>
      {status !== 201 && (
        <>
          <Styled.Field>
            <TextInput
              value={firstName}
              label={'First name'}
              onChange={(value: string) => setFirstName(value)}
              type={'text'}
              minLength={3}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              value={lastName}
              label={'Last name'}
              onChange={(value: string) => setLastName(value)}
              type={'text'}
              minLength={3}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              value={email}
              label={'Email'}
              onChange={(value: string) => setEmail(value)}
              type={'email'}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              value={password}
              label={'Password'}
              onChange={(value: string) => setPassword(value)}
              type={'password'}
              minLength={6}
              required
            />
          </Styled.Field>
          <Button type={'submit'}>Create an account</Button>
        </>
      )}
      {error && <div style={{ color: 'red', paddingTop: '1rem' }}>{error}</div>}
      {status === 201 && (
        <>
          <div style={{ color: 'green', paddingBottom: '0.5rem' }}>Account was successfully created!</div>
        </>
      )}
    </Styled.Root>
  )
};

export default React.memo(SignUpForm);
