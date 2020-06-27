import React from 'react';

import Styled from './Footer.style';

const Footer = () => {
  return (
    <Styled.Root as={'footer'}>
      <Styled.Wrapper className={'content-wrapper'}>

      </Styled.Wrapper>
    </Styled.Root>
  )
};

export default React.memo(Footer);
