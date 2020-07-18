import styled from 'styled-components';

const Tooltip: any = {};

Tooltip.Tooltip = styled.div`
  display: flex;
  position: absolute;
  bottom: 100%;
  margin-bottom: 20px;
  margin-left: -34px;
  left: 50%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  text-align: left;
  width: 400px;
  z-index: 105;
  :after {
    content: '';
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top: 10px solid white;
    position: absolute;
    top: 100%;
    left: 25px;
  }
  :before {
    content: '';
    left: 0;
    right: 0;
    position: absolute;
    top: 100%;
    height: 20px;
  }
`;

Tooltip.Content = styled.div`
  padding: 1rem;
  background: white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  min-width: 67px;
  position: relative;
`;

Tooltip.ContentWrapper = styled.div``;

Tooltip.Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: default;
  &:hover,
  [data-tooltip]:hover & {
    display: block;
    ${Tooltip.Tooltip} {
      opacity: 1;
      visibility: visible;
      transform: none;
      transition: all 0.3s ease;
    }
    ${Tooltip.Content} {
      box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
  }
`;

export default Tooltip;
