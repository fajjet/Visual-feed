import styled, { css } from 'styled-components';
// import { provider } from 'styles';

const Posts: any = {};

Posts.Root = styled.div`
  padding: 8rem 0;
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

Posts.Post = styled.article`
  position: relative;
  margin-bottom: 3rem;
  padding-bottom: 3.75rem;
  pre{
    background-color: #ebebeb;
    margin-bottom: 0;
    margin-top: 1.5rem;
  }
  time {
    font-size: 0.75rem;
  }
  &:not(:last-of-type) {
     border-bottom: 1px solid steelblue;
  }
`;

Posts.PostImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  img {
    max-height: 70vh;
    margin-bottom: 0;
  }
  background-color: #ebebeb;
`;

Posts.PostAuthor = styled.div`
  border: none !important;
  font-size: 0.8rem;
  font-weight: 500;
  color: steelblue;
  span {
    padding-left: 3px;
  }
`;

Posts.PostUnderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

Posts.PostLike = styled.div<{ isLiked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: gray;
  position: relative;
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
    display: inline-block;
    font-size: 0.9rem;
    margin-left: 0.25rem;
    font-weight: 700;
    @keyframes numInit {
      0%{
        transform: translateY(5px);
        opacity: 0;
      }
      100%{
        transform: translateY(0);
        opacity: 1;
      }
    }
    animation: numInit 0.3s ease forwards;
  }
`;

Posts.LikesList = styled.div`
  padding: 1rem;
  max-height: 5rem;
  overflow-y: auto;
  li {
    font-size: 0.85rem;
    margin-bottom: 0;
  }
  a {
    border: none;
    color: inherit !important;
    display: inline-block;
    &:hover{
      text-decoration: underline;
    }
  }
`;

Posts.PostUnderTitleLeft = styled.div`
  display: flex;
  align-items: center;
  a{
   margin-right: 1rem;
  }
`;

export default Posts;
