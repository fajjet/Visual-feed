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

Profile.Role = styled.div`
  background-color: steelblue;
  display: inline-block;
  border-radius: 5px;
  color: white;
  padding: 0.15rem 0.5rem;
  margin-bottom: 0.5rem;
`;

Profile.DataItem = styled.div`
  padding-bottom: 0.7rem;
`;

Profile.DataSection = styled.div`
  padding-top: 0rem;
`;

Profile.Sessions = styled.div`
  padding-top: 2rem;
`;

Profile.Head = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

Profile.Session = styled.div`
  padding-top: 0.5rem;
  max-width: 35rem;
  margin-bottom: 1.75rem;
  pre{
    margin-bottom: 0;
  }
  
`;

Profile.SessionHead = styled.span`
  display: flex;
  align-items: center;
`;

export default Profile;
