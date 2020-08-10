import React, { ReactChild, ReactNode } from 'react';
import Styled from './Card.style';

const Card = (props: { children: ReactNode, as?: string, noPadding?: boolean }) => {
  return (
    <Styled.Root noPadding={props.noPadding} as={props.as}>
      {props.children}
    </Styled.Root>
  )
};

Card.defaultProps = {
  noPadding: true,
  as: 'div',
}

export default React.memo(Card);
