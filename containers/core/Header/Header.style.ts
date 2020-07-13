import styled from 'styled-components';

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
  font-weight: 300;
  text-transform: uppercase;
  font-size: 0.6rem;
  letter-spacing: 1px;
`;

Header.Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

Header.Link = styled.div`
  margin-right: 2rem;
`;

Header.Left = styled.div`
  display: flex;
  align-items: center;
`;

Header.Right = styled.div`
  display: flex;
  align-items: center;
  ${Header.Link} {
    margin-right: 0;
    margin-left: 2rem;
  }
`;

export default Header;
