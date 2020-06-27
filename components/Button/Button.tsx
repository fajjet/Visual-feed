import React from 'react';
// import { Loader } from 'components';

import Styled from './Button.style';

interface Props {
  children: React.ReactChild;
  onClick?(): any;
}

const Button = (props: Props) => {
  const { children, onClick } = props;

  return (
    <Styled.Root as={'button'} onClick={onClick}>
      {children}
    </Styled.Root>
  )
};

export default React.memo(Button);
