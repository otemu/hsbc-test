import { Node } from 'reactflow';

export interface IControl {
  label: string;
  nodeType: string;
  styledNode?: IStyledNode;
}

export interface IStyledNode {
  isDiamond?: boolean;
  isCircle?: boolean;
  isFolded?: boolean;
  borderColor?: string;
}

export type TNodeData = Pick<Node, 'data'>;
