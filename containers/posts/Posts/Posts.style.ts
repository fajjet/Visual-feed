import styled from 'styled-components';
// import { provider } from 'styles';

const Posts: any = {};

Posts.Root = styled.div`
  min-height: 100vh;
`;

Posts.AddButton = styled.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: steelblue;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 200;
  line-height: 0;
  span {
    display: inline-block;
    position: relative;
    height: 1rem;
    width: 1rem;
    color: white;
    transition: all 0.15s ease;
    &:after{
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      height: 100%;
      left: calc(50% - 1px);
      width: 2px;
      background-color: currentColor;
    }
    &:before{
      content: '';
      display: inline-block;
      position: absolute;
      top: calc(50% - 1px);
      height: 2px;
      left: 0;
      width: 100%;
      background-color: currentColor;
    }
  }
  &:hover{
    span {
      transform: rotate(90deg);
    }
  }
`;

Posts.Head = styled.div`
  padding: 1.5rem 2rem;
  h4 {
    margin: 0;
  }
`;

export default Posts;
