import { ChangeEvent, DragEvent, FormEvent } from 'react';
import { Node } from 'reactflow';

export interface IControl {
  label: string;
  nodeType:
    | 'startNode'
    | 'stepNode'
    | 'decisionNode'
    | 'endNode'
    | 'commentNode';
  styledNode?: IStyledNode;
}

export interface IStyledNode {
  isDiamond?: boolean;
  isCircle?: boolean;
  isFolded?: boolean;
  borderColor?: string;
}

export type TNodeData = Pick<Node, 'data'>;
export type TId = string;

export type TChangeEvent = (
  id: TId
) => (e: ChangeEvent<HTMLInputElement>) => void;
export type TDragEvent = (id: TId) => (e: DragEvent<HTMLInputElement>) => void;
export type TFormEvent = (e: FormEvent<Element>) => void;
