import styled from "styled-components";
// import { provider } from 'styles';

const AddComment: any = {};

AddComment.Root = styled.div`
  textarea {
    min-height: 7rem !important;
    padding: 1.5rem 2rem;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.015);
    border-radius: 0 0 5px 5px;
    border: none;
  }
`;

AddComment.Top = styled.div`
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.05);
  position: relative;
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
