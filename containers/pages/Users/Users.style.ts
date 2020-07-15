import styled from 'styled-components';
// import { provider } from 'styles';

const Users: any = {};

Users.Root = styled.div`
  padding: 8rem 0;
  min-height: 100vh;
  h4 {
    padding-left: 1rem;
  }
  ul {
    padding: 0;
  }
`;

Users.ItemAvatar = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  background-color: slategray;
  margin-right: 1rem;
`;

Users.Item = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0;
  border: none !important;
  transition: background-color 0.15s ease;
  &:hover{
    background-color: rgba(0,0,0,0.025);
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0,0,0,0.1) !important;
  }
  &:nth-child(2n) {
    ${Users.ItemAvatar} {
      background-color: #92A0AF;
    }
  }
`;

Users.ItemSelf = styled.div`
  background-color: steelblue;
  color: white;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 0.1rem 0.3rem;
  margin-left: 0.75rem;
`;

export default Users;
