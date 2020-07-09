import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Router from 'next/router';
import Cookies from 'js-cookie';

import actions from "store/actions";
import { TextInput, Button } from 'components';
import { auth } from "utils/api";
import Styled from './SignInForm.style';
import { IUser } from "server/models/user";

interface AuthResponse {
  user?: IUser;
  tokenId?: string;
  error?: string;
}

const SignInForm = () => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [status, setStatus] = useState<null | number>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await auth(email, password);
    const response: AuthResponse = (await res.json());
    if (res.status === 200) {
      if (error) setError(undefined);
      await dispatch(actions.setUser(response.user));
      Cookies.set('tokenId', response.tokenId || '');
      Router.push('/');
    } else {
      setError(response.error);
    }
    setStatus(res.status);
  };

  return (
    <Styled.Root as={'form'} onSubmit={onSubmit}>
      {status !== 200 && (
        <>
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
          <Button type={'submit'}>Enter</Button>
          {error && (
            <div style={{ color: 'red', paddingTop: '1rem' }}>{error}</div>
          )}
        </>
      )}
    </Styled.Root>
  )
};

export default React.memo(SignInForm);
