import styled, { css } from 'styled-components';

const Article: any = {};

Article.Root = styled.article`
  position: relative;
  margin-bottom: 2rem;
  pre{
    padding: 0;
    margin-bottom: 0;
    background: none;
    padding-top: 0.5rem;
  }
  time {
    font-size: 0.75rem;
  }
`;

Article.Image = styled.div`
  
`;

Article.Author = styled.div`
  border: none !important;
  font-size: 0.8rem;
  font-weight: 500;
  color: steelblue;
  span {
    padding-left: 3px;
  }
`;

Article.Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
`;

Article.Like = styled.div<{ isLiked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: gray;
  position: relative;
  transition: color 0.15s ease;
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

Article.LikeList = styled.div`
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
    font-size: 0.9rem;
    &:hover{
      text-decoration: underline;
    }
  }
`;

Article.BottomLeft = styled.div`
  display: flex;
  align-items: center;
  a{
   margin-right: 1rem;
  }
`;

Article.Head = styled.div`
  padding: 1.5rem 2rem;
  h4 {
    margin: 0;
  }
  h1 {
    margin: 0.35rem 0;
  }
`;

export default Article;
