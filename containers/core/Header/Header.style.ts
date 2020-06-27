import styled from 'styled-components';
import { provider } from 'styles';

const Header: any = {};

Header.Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.25rem;
  background-color: white;
  box-shadow: 0 0 18px rgba(0,0,0,0.05);
  z-index: 100;
`;

Header.Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

Header.Link = styled.a`
  font-weight: 300;
  margin-right: 2rem;
  text-transform: uppercase;
  font-size: 0.6rem;
  letter-spacing: 1px;
  transition: all 0.15s ease;
  &:hover{
    color: ${provider.color.blue};
  }
`;

export default Header;
