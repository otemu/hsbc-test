import { Handle, Position } from 'reactflow';
import { TNodeData } from '../../../types';
import { CustomNodeStyles } from './CustomNodeStyles';

export const StepNode = (props: TNodeData) => {
  const {
    data: { label },
  } = props;

  return (
    <CustomNodeStyles>
      <Handle
        id="tl"
        type="target"
        position={Position.Top}
        style={{ left: '10%' }}
      />
      <Handle id="tm" type="target" position={Position.Top} />
      <Handle
        id="tr"
        type="target"
        position={Position.Top}
        style={{ left: '90%' }}
      />

      <strong>{label}</strong>

      <Handle
        id="bl"
        type="source"
        position={Position.Bottom}
        style={{ left: '10%' }}
      />
      <Handle id="bm" type="source" position={Position.Bottom} />
      <Handle
        id="br"
        type="source"
        position={Position.Bottom}
        style={{ left: '90%' }}
      />
    </CustomNodeStyles>
  );
};
