import React, { ReactNode } from "react";
import Styled from "./card.style";

interface Props {
  children: ReactNode;
  as?: string;
  noPadding?: boolean;
}

const Card = (props: Props) => {
  return (
    <Styled.Root noPadding={props.noPadding} as={props.as}>
      {props.children}
    </Styled.Root>
  );
};

Card.defaultProps = {
  noPadding: true,
  as: "div",
};

export default React.memo(Card);
