import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import Router from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { AuthResponse } from "types";
import actions from "store/actions";
import { TextInput } from 'components';
import { auth } from "utils/api";
import Styled from './SignInForm.style';

const SignInForm = () => {
  const loading = useRef(false);
  const [status, setStatus] = useState<null | number>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    if (loading.current) return;
    loading.current = true;
    e.preventDefault();

    const res = await auth(email, password);
    const response: AuthResponse = await res.json();

    if (res.status === 200) {
      await dispatch(actions.setUser(response.user));
      Cookies.set('tokenId', response.tokenId || '');
      Router.push('/');
      toast.success('Successfully logged in');
    } else {
      toast.error(response.error);
      loading.current = false;
    }
    setStatus(res.status);
  };

  return (
    <Styled.Root as={'form'} name={'signIn'} onSubmit={onSubmit}>
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
      <button type={'submit'} disabled={status === 200}>Enter</button>
    </Styled.Root>
  )
};

export default React.memo(SignInForm);
