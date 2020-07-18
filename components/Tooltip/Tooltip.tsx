import React from 'react';
import Block from './Tooltip.style';

const Tooltip = (props: any) => {
  return (
    <Block.Root>
      <Block.Tooltip>
        <Block.Content>
          <Block.ContentWrapper>{props.children}</Block.ContentWrapper>
        </Block.Content>
      </Block.Tooltip>
    </Block.Root>
  );
}

export default React.memo(Tooltip);
