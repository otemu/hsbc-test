import { Handle, Position } from 'reactflow';
import { TNodeData } from '../../../types';
import { CustomNodeStyles, DiamondStyle } from './CustomNodeStyles';

export const DecisionNode = (props: TNodeData) => {
  const {
    data: { label },
  } = props;

  return (
    <CustomNodeStyles isDiamond>
      <Handle type="target" position={Position.Top} />
      <DiamondStyle></DiamondStyle>
      <strong>{label}</strong>
      <Handle type="source" position={Position.Bottom} />
    </CustomNodeStyles>
  );
};
