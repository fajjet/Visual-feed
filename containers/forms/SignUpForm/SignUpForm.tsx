import React, { useState } from 'react';
import Link from 'next/link';

import { TextInput, Button } from 'components';
import { createUser, getUserTrace } from "utils/api";
import Styled from './SignUpForm.style';

interface Props {

}

const SignUpForm = (props: Props) => {
  const [status, setStatus] = useState<null | number>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    const trace = await getUserTrace();
    createUser(user, trace).then((res: any) => {
      setStatus(res.status);
    });
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
      {status === 409 && <div style={{ color: 'red', paddingTop: '1rem' }}>User with the same email exists</div>}
      {status === 201 && (
        <>
          <div style={{ color: 'green', paddingBottom: '0.5rem' }}>Account was successfully created!</div>
          <Link href={'/signin'} passHref>
            <a>Sign in</a>
          </Link>
          <br/><br/>
        </>
      )}
    </Styled.Root>
  )
};

export default React.memo(SignUpForm);
