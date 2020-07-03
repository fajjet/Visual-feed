import React, { useState } from 'react';

import { TextInput, Button } from 'components';
import { auth, getUserTrace } from "utils/api";
import Styled from './SignInForm.style';

interface Props {

}

const SignInForm = (props: Props) => {
  const [status, setStatus] = useState<null | number>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trace = await getUserTrace();
    const res = await auth(email, password, trace);
    if (res.status === 200) {
      setStatus(200);
      const user = await res.json();
      console.log(user)
    }
  };

  return (
    <Styled.Root as={'form'} onSubmit={onSubmit}>
      <h2>Sign in</h2>
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
