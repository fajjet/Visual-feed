import styled from 'styled-components';
// import { provider } from 'styles';

const Home: any = {};

Home.Root = styled.div`
  padding: 8rem 0;
  min-height: 100vh;
`;

Home.AddButton = styled.div`
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

Home.Post = styled.article`
  position: relative;
  margin-bottom: 3rem;
  padding-bottom: 3.5rem;
  pre{
    background-color: #ebebeb;
    margin-bottom: 0;
    margin-top: 1.5rem;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
`;

Home.PostImage = styled.div`
  display: flex;
  justify-content: center;
  img {
    max-height: 70vh;
    margin-bottom: 0;
  }
  background-color: #ebebeb;
`;

Home.PostUnderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export default Home;
