import styled from 'styled-components';
// import { provider } from 'styles';

const Profile: any = {};

Profile.Root = styled.div`
  padding: 8rem 0;
  min-height: 100vh;
`;

Profile.Link = styled.div`
  color: cornflowerblue;
  margin: 0 10px;
  &:hover{
    text-decoration: underline;
  }
`;

Profile.DataItem = styled.div`
  padding-bottom: 0.7rem;
`;

Profile.DataSection = styled.div`
  padding-top: 2rem;
`;

Profile.DeleteSession = styled.span`
  color: red;
  cursor: pointer;
  margin-left: 1rem;
  &:hover{
    opacity: 0.5;
  }
`;

export default Profile;
