import React from 'react';
// import { Loader } from 'components';

import Styled from './TextInput.style';

interface Props {
  value: any;
  onChange?(value: string): any;
  label?: string;
}

const TextInput = (props: Props) => {
  const { label, value, onChange: onChangeHandler } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler && onChangeHandler(e.target.value);
  };

  return (
    <Styled.Root>
      <label>
        {label && <Styled.Label>{label}</Styled.Label>}
        <input
          onChange={onChange}
          value={value}
        />
      </label>
    </Styled.Root>
  )
};

export default React.memo(TextInput);
