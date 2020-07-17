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
`;

User.Role = styled.div`
  background-color: steelblue;
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: 5px;
`;

export default User;
