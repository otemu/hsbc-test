import { Handle, Position } from 'reactflow';
import { TNodeData } from '../../../types';
import { CustomNodeStyles } from './CustomNodeStyles';

export const StartNode = (props: TNodeData) => {
  const {
    data: { label },
  } = props;

  return (
    <CustomNodeStyles isCircle={true} borderColor="green">
      <strong>{label}</strong>
      <Handle type="source" position={Position.Bottom} />
    </CustomNodeStyles>
  );
};
