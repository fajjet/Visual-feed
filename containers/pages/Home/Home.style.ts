import styled, { css } from 'styled-components';
// import { provider } from 'styles';

const Home: any = {};

Home.Root = styled.div`
  padding: 6rem 0;
  min-height: 100vh;
`;

Home.AddButton = styled.div`
  height: 3rem;
  width: 3rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: white !important;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 200;
  border: none;
  line-height: 0;
  overflow: hidden;
  transition: all 0.35s ease;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.1), 0 2px 10px rgba(0,0,0,0.175);
  span {
    display: inline-block;
    position: relative;
    height: 0.8rem;
    width: 0.8rem;
    color: steelblue;
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
      box-shadow: 0 0 1px currentColor;
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
      box-shadow: 0 0 1px currentColor;
    }
  }
  @keyframes addButtonLine1{
    0%{
      transform: translateX(0);
      width: 100%;
    }
    50%{
      transform: translateX(2.5rem);
      width: 100%;
    }
    51%{
      transform: translateX(-2rem);
      width: 170%;
    }
    100%{
      transform: translateX(0);
      width: 100%;
    }
  }
  @keyframes addButtonLine2{
    0%{
      transform: translateY(0);
      height: 100%;
    }
    50%{
      transform: translateY(2.5rem);
      height: 100%;
    }
    51%{
      transform: translateY(-2.5rem);
      height: 200%;
    }
    100%{
      transform: translateY(0);
      height: 100%;
    }
  }
  &:hover{
    box-shadow: inset 0 0 10px rgba(0,0,0,0.175), 0 5px 15px rgba(0,0,0,0.25);
    span {
      &:before{
        animation: addButtonLine1 0.5s ease forwards 0.05s;
      }
      &:after{
        animation: addButtonLine2 0.5s ease forwards;
      }
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
  time {
    font-size: 0.75rem;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
`;

Home.PostImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  img {
    max-height: 70vh;
    margin-bottom: 0;
  }
  background-color: #ebebeb;
`;

Home.PostAuthor = styled.div`
  border: none !important;
  font-size: 0.8rem;
  font-weight: 500;
  color: steelblue;
  span {
    padding-left: 3px;
  }
`;

Home.PostUnderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

Home.PostLike = styled.div<{ isLiked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  &:hover {
    color: steelblue;
  }
  ${({ isLiked }) => css`
    ${isLiked && css`
        color: red;
     `}
  `}
  span {
    display: inline-block;
  }
  i {
    font-size: 0.9rem;
    margin-left: 0.25rem;
    font-weight: 700;
  }
`;

Home.PostUnderTitleLeft = styled.div`
  display: flex;
  align-items: center;
`;

export default Home;
