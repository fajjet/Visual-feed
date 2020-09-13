import styled from "styled-components";

const Comment: any = {};

Comment.Root = styled.div``;

Comment.Top = styled.div`
  display: flex;
  align-items: center;
`;

Comment.Time = styled.time`
  padding-left: 1rem;
  font-size: 12px;
  opacity: 0.5;
`;

Comment.Author = styled.a`
  display: inline-flex;
  border: none !important;
  margin-right: 1rem;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
`;

Comment.Content = styled.p`
  padding-top: 0.25rem;
  margin: 0;
  font-size: 16px;
`;

export default Comment;
