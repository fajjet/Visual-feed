import styled from "styled-components";
// import { provider } from 'styles';

const Post: any = {};

Post.Root = styled.div`
  padding: 6rem 0 8rem 0;
  min-height: 100vh;
  h6 {
    margin: 0%;
  }
`;

Post.Comment = styled.div`
  &:not(:last-child) {
    padding-bottom: 1.5rem;
  }
`;

Post.AddComment = styled.div`
  padding-top: 2rem;
`;

export default Post;
