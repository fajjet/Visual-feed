import styled, { css } from 'styled-components';
// import { provider } from 'styles';

const SubmitPost: any = {};

SubmitPost.Root = styled.div<{ isActive: boolean }>`
  position: fixed;
  top: -100%;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: white;
  display: flex;
  align-items: center;
  overflow-y: auto;
  transition: opacity 0.3s ease, transform 0s ease 0.3s, top 0s ease 0.3s;
  opacity: 0;
  transform: translateY(3%);
   ${({ isActive }) => css`
    ${isActive && css`
        top: 0;
        transition: opacity 0.3s ease, transform 0.3s ease, top 0s ease 0s;
        opacity: 1;
        transform: none;
     `}
  `}
`;

SubmitPost.Content = styled.div`
  max-width: 25rem;
  margin: 2rem auto;
  position: relative;
  h4 {
    margin-top: 0;
  }
  input[type=file] {
    width: 100%;
  }
`;

SubmitPost.ButtonsBar = styled.div`
  display: flex;
  justify-content: space-between;
  #close {
   background: none;
   color: inherit;
  }
`;

SubmitPost.CloseArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

export default SubmitPost;
