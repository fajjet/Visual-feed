import styled from 'styled-components';

const Loader: any = {};

Loader.Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @keyframes sk-rotate{
    100% { 
      transform: rotate(360deg)
    }
  }
  
  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
    }
  }
`;

Loader.Spinner = styled.div`
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  
  animation: sk-rotate 2.0s infinite linear, colorAnimation 5s linear infinite, fadeIn 0.3s ease;
`;

Loader.Dot = styled.div`
  width: 55%;
  height: 55%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: white;
  border-radius: 100%;
  box-shadow: 
    0 0 3px 1px currentColor, 
    0 0 5px 2px currentColor, 
    0 0 15px 5px currentColor,  
    0 0 25px 10px currentColor,
    0 0 50px 15px currentColor;
  
  animation: sk-bounce 2.0s infinite ease-in-out;
  
  &:nth-child(1) {
  
  }
  
  &:nth-child(2) {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
`;

export default Loader;
