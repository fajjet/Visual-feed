import styled from 'styled-components';
// import { provider } from 'styles';

const User: any = {};

User.Root = styled.div`
  padding: 8rem 0;
  min-height: 100vh;
`;

User.Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin: 0;
  }
`;

User.Role = styled.div`
  color: black;
  padding: 0.35rem 0.8rem;
  border-radius: 5px;
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid rgba(0,0,0,0.125);
`;

User.Posts = styled.div`
  padding-top: 2rem;
`;

export default User;
