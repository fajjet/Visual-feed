import styled, { css } from 'styled-components';
// import { provider } from 'styles';

const Card: any = {};

Card.Root = styled.div<{ noPadding: boolean }>`
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0,0,0,0.1);
  background-color: white;
  width: 100%;
  display: block;
  ${({ noPadding }) => css`
    ${!noPadding && css`
        padding: 1.5rem 2rem;
     `}
  `}
`;

export default Card;
