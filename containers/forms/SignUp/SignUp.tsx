import React, { useState } from 'react';
import { TextInput, Button } from 'components';

import Styled from './SignUp.style';

interface Props {

}

interface Field {
  value: any;
  isValid: boolean;
  errorMessage: string;
}

const field: Field = {
  value: '',
  isValid: false,
  errorMessage: '',
};

const SignUp = (props: Props) => {
  const [firstName, setFirstName] = useState<Field>({ ...field });
  const [lastName, setLastName] = useState<Field>({ ...field });
  const [email, setEmail] = useState<Field>({ ...field });
  const [password, setPassword] = useState<Field>({ ...field });

  return (
    <Styled.Root as={'form'}>
      <h2>Sign up</h2>
      <Styled.Field>
        <TextInput
          value={firstName.value}
          label={'First name'}
          onChange={(value: string) => setFirstName({ ...firstName, isValid: !!value, value })}
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          value={lastName.value}
          label={'Last name'}
          onChange={(value: string) => setLastName({ ...lastName, isValid: !!value, value })}
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          value={email.value}
          label={'Email'}
          onChange={(value: string) => setEmail({ ...email, isValid: !!value, value })}
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          value={password.value}
          label={'Password'}
          onChange={(value: string) => setPassword({ ...password, isValid: !!value, value })}
        />
      </Styled.Field>
      <Button>Create an account</Button>
    </Styled.Root>
  )
};

export default React.memo(SignUp);
