import styled, { css } from 'styled-components';

const Image: any = {};

Image.Root = styled.div`
  max-height: 512px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
    max-width: 100%;
    margin: 0px;
    animation: fadeIn 0.5s ease forwards;
  }
`;

Image.Play = styled.div<{ state: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  ${props =>
  props.state &&
  css`
    background: none;    
  `};
`;

Image.PlayButton = styled.button<{ state: boolean }>`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  background-color: white !important;
  color: black !important;
  transition: all 0.35s ease;
  border: 3px solid white !important;
  box-shadow: inset 0 0 0 0 lightskyblue;
  font-size: 10px;
  font-weight: 800;
  top: 0;
  position: relative;
  user-select: none;
  span{
    letter-spacing: 2px;
    line-height: 1;
    display: inline-block;
    transition: all 0.2s ease 0.05s;
  }
  ${props =>
  props.state &&
  css`
    top: 50%;  
    span{
      transform: translateY(-150%);
    }
  `};
  &:hover{
     box-shadow: inset 0 0 20px 8px black;
     span{
      letter-spacing: 0;
     }
  }
`;

export default Image;
