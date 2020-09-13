import styled from "styled-components";
// import { provider } from 'styles';

const AddComment: any = {};

AddComment.Root = styled.div`
  textarea {
    min-height: 70px !important;
    padding: 1.5rem 2rem;
    border-radius: 0;
  }
`;

AddComment.Top = styled.div`
  h5 {
    margin: 0;
  }
  button {
    border-radius: 3px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
`;

AddComment.Bottom = styled.div`
  padding: 1.5rem 2rem;
`;

export default AddComment;
