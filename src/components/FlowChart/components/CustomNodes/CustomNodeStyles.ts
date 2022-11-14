import styled from 'styled-components';
import { IStyledNode } from '../../types/types';

export const CustomNodeStyles = styled.div<IStyledNode>`
  display: flex;
  border: 2px solid ${({ borderColor }) => borderColor || 'blue'};
  padding: 20px 20px;
  background: white;
  align-items: center;
  justify-content: center;
  max-width: 100px;
  font-size: 12px;
  text-align: center;

  ${({ isCircle }) =>
    isCircle &&
    `
    border-radius: 50%;
    width: 75px;
    height: 75px;
    padding: 0;
  `}

  ${({ isDiamond }) =>
    isDiamond &&
    `
    position: relative;
    width: 80px;
    height: 80px;
    border: none;
    background: transparent;
    color: #000;

    > strong {
      position: absolute;
    }
  `}


  ${({ isFolded, borderColor }) =>
    isFolded &&
    `
    position: relative; 

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid ${borderColor};
      clear: both;
    }
  `}
`;

export const DiamondStyle = styled.div`
  background: white;
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid blue;
  transform: rotate(45deg);
  z-index: -1;
`;
