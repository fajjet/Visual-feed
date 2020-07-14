import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Router from 'next/router';

import { TextInput } from 'components';
import { normalizeNameInput } from 'utils';
import { createUser } from "utils/api";
import Styled from './SignUpForm.style';
import actions from 'store/actions';
import Cookies from "js-cookie";


const SignUpForm = () => {
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
    const response = await res.json();
    if (res.status === 201) {
      const user = response.user;
      Cookies.set('tokenId', response.tokenId || '');
      dispatch(actions.setUser(user));
      toast.success('Your account was successfully created');
      Router.push('/');

    } else {
      toast.error(response.error);
    }
    setStatus(res.status);
  };

  return (
    <Styled.Root as={'form'} name={'signUp'} onSubmit={onSubmit}>
      {status !== 201 && (
        <>
          <Styled.Field>
            <TextInput
              value={firstName}
              label={'First name'}
              onChange={(value: string) => setFirstName(normalizeNameInput(value))}
              type={'text'}
              minLength={3}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              value={lastName}
              label={'Last name'}
              onChange={(value: string) => setLastName(normalizeNameInput(value))}
              type={'text'}
              minLength={3}
              required
            />
          </Styled.Field>
          <Styled.Field>
            <TextInput
              placeholder={'* without confirmation'}
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
          <button type={'submit'}>Create an account</button>
        </>
      )}
    </Styled.Root>
  )
};

export default React.memo(SignUpForm);
