import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Router from 'next/router'

import actions from "store/actions";
import { TextInput, Button } from 'components';
import { auth, getUserTrace } from "utils/api";
import Styled from './SignInForm.style';
import { IUser } from "server/models/user";

interface Props {

}

interface AuthResponse {
  user?: IUser;
}

const SignInForm = (props: Props) => {
  const [status, setStatus] = useState<null | number>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trace = await getUserTrace();
    const res = await auth(email, password, trace);
    if (res.status === 200) {
      setStatus(200);
      const user: AuthResponse  = (await res.json())?.user;
      await dispatch(actions.setUser(user));
      Router.push('/');
    }
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
        </>
      )}
    </Styled.Root>
  )
};

export default React.memo(SignInForm);
