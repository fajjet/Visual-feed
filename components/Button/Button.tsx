import React from 'react';
// import { Loader } from 'components';

import Styled from './Button.style';

interface Props {
  children: React.ReactChild;
  type?: 'button' | 'submit';
  onClick?(): any;
}

const Button = (props: Props) => {
  const { children, type = 'button' , onClick } = props;

  return (
    <Styled.Root as={'button'} type={type} onClick={onClick}>
      {children}
    </Styled.Root>
  )
};

export default React.memo(Button);
