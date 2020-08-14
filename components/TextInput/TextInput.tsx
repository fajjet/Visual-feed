import React from 'react';
// import { Loader } from 'components';

import Styled from './TextInput.style';

interface Props {
  name?: string;
  value: any;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel';
  onChange?(value: string): any;
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  as?: 'input' | 'textarea';
}

const TextInput = (props: Props) => {
  const {
    label,
    type = 'text',
    value,
    onChange: onChangeHandler,
    required,
    minLength,
    maxLength,
    name: passedName,
    placeholder = '',
    as = 'input',
  } = props;
  const name = passedName || label;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler && onChangeHandler(e.target.value);
  };

  return (
    <Styled.Root>
      <label>
        {label && <Styled.Label>{label}</Styled.Label>}
        <Styled.Input
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          as={as}
        />
      </label>
    </Styled.Root>
  )
};

export default React.memo(TextInput);
