import { Handle, Position } from 'reactflow';
import { TNodeData } from '../../types/types';
import { CustomNodeStyles } from './CustomNodeStyles';

export const EndNode = (props: TNodeData) => {
  const {
    data: { label },
  } = props;

  return (
    <CustomNodeStyles isCircle={true} borderColor="red">
      <Handle type="target" position={Position.Top} />
      <strong>{label}</strong>
    </CustomNodeStyles>
  );
};
