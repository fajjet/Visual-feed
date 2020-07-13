import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { TextInput, Button } from 'components';
import { removeSymbolsAndDigits } from 'utils';
import { createUser } from "utils/api";
import Styled from './SignUpForm.style';
import actions from 'store/actions';
import { AuthResponse } from "types";
import Cookies from "js-cookie";


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
    const res = await createUser(user);
    const response: AuthResponse = await res.json();
    if (res.status === 201) {
      if (error) setError(undefined);
      const user = response.user;
      Cookies.set('tokenId', response.tokenId || '');
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
              onChange={(value: string) => setFirstName(removeSymbolsAndDigits(value))}
              type={'text'}
              minLength={3}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              value={lastName}
              label={'Last name'}
              onChange={(value: string) => setLastName(removeSymbolsAndDigits(value))}
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
