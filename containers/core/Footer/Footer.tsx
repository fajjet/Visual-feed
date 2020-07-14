import React from 'react';

import Styled from './Footer.style';

const Footer = () => {
  return (
    <Styled.Root as={'footer'}>
      <Styled.Wrapper className={'content-wrapper'}>
        <a href={'https://github.com/fajjet/mern-app'} target={'_blank'}>github</a>
      </Styled.Wrapper>
    </Styled.Root>
  )
};

export default React.memo(Footer);
