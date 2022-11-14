import { TNodeData } from '../../../types';
import { CustomNodeStyles } from './CustomNodeStyles';

export const CommentNode = (props: TNodeData) => {
  const {
    data: { label },
  } = props;

  return (
    <CustomNodeStyles isFolded borderColor="yellow">
      <div>
        <strong>{label}</strong>
      </div>
    </CustomNodeStyles>
  );
};
