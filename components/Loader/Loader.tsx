import React from 'react';
import Styled from './Loader.style';

interface Props {
  isActive: boolean;
}

const Loader = (props: Props) => {
  return (
    <Styled.Root isActive={props.isActive}>
      <Styled.Spinner>
        <Styled.Dot/>
        <Styled.Dot/>
      </Styled.Spinner>
    </Styled.Root>
  )
};

Loader.defaultProps = {
  isActive: true,
}

export default Loader;
