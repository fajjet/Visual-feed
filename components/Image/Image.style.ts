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
  //background-color: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.7s ease-out;
  &:before, &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 50%;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.25);
    transition: all 0.5s ease;
  }
  &:after{
    left: auto;
    right: 0;
  }
  ${props =>
  props.state &&
  css`
    background: none;   
    &:before{
      transform: translateX(-100%);
    } 
    &:after{
      transform: translateX(100%);
    } 
  `};
`;

Image.PlayButton = styled.button<{ state: boolean }>`
  height: 5rem;
  width: 5rem;
  position: relative;
  z-index: 2;
  border-radius: 50%;
  background-color: white !important;
  color: black !important;
  transition: 
    top 0.7s cubic-bezier(.3,.63,.01,1), 
    transform 0.7s cubic-bezier(.3,.63,.01,1), 
    box-shadow 0.5s ease;
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
    transition: letter-spacing 0.2s ease 0.05s, transform 0.5s ease;
  }
  ${props =>
  props.state &&
  css`
    top: 50%;  
    transition: 
      transform 0.5s cubic-bezier(.47,.56,.17,1.15),
      top 0.5s cubic-bezier(.47,.56,.17,1.15),
      box-shadow 0.5s ease;  
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
