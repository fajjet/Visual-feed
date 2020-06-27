import React from 'react';

import Styled from './Text.style';
export type View = 'h1';

interface Props {
  children: string;
  view: View;
  style?: React.CSSProperties;
  as?: string;
}

const Text = (props: Props) => {
  const { children, view, as = 'span', style } = props;
  return (
    <Styled.Root view={view} as={as} style={style}>
      {children}
    </Styled.Root>
  )
};

export default React.memo(Text);
