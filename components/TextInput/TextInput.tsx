import React from 'react';
// import { Loader } from 'components';

import Styled from './TextInput.style';

interface Props {
  value: any;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel';
  onChange?(value: string): any;
  required?: boolean;
  label?: string;
  minLength?: number;
}

const TextInput = (props: Props) => {
  const { label, type = 'text', value, onChange: onChangeHandler, required, minLength } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler && onChangeHandler(e.target.value);
  };

  return (
    <Styled.Root>
      <label>
        {label && <Styled.Label>{label}</Styled.Label>}
        <input
          type={type}
          onChange={onChange}
          value={value}
          required={required}
          minLength={minLength}
        />
      </label>
    </Styled.Root>
  )
};

export default React.memo(TextInput);
