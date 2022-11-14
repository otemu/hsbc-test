import { DragEvent } from 'react';
import styled from 'styled-components';
import { IControl } from '../../types/types';
import {
  CustomNodeStyles,
  DiamondStyle,
} from '../CustomNodes/CustomNodeStyles';

const SideCustomNodeStyles = styled(CustomNodeStyles)`
  margin: 10px 0;
`;

const SideDiamondStyle = styled(DiamondStyle)`
  z-index: 0;
`;

const SideBarNode: React.FC<IControl> = ({ nodeType, label, styledNode }) => {
  const onDragStart =
    (nodeType: string, label: string) => (event: DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData(
        'application/reactflow',
        JSON.stringify({ type: nodeType, label })
      );
      event.dataTransfer.effectAllowed = 'move';
    };

  const { isDiamond } = styledNode || {};

  return (
    <SideCustomNodeStyles
      {...styledNode}
      onDragStart={onDragStart(nodeType, label)}
      draggable
    >
      {isDiamond && <SideDiamondStyle />}
      <strong>{label}</strong>
    </SideCustomNodeStyles>
  );
};

export default SideBarNode;
