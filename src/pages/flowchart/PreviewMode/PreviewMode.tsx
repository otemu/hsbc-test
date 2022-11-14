import {
  useState,
  useRef,
  useCallback,
  DragEvent,
  useMemo,
  MouseEvent,
  ChangeEvent,
} from 'react';
import {
  Form,
  Button,
  InputGroup,
  Container,
  Col,
  Row,
  Alert,
} from 'react-bootstrap';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import {
  CommentNode,
  DecisionNode,
  StartNode,
  EndNode,
  StepNode,
} from '../../../components/FlowChart/components/CustomNodes';
import Navigation from '../../../components/FlowChart/components/Navigation/Navigation';
import SideBar from '../../../components/FlowChart/components/SideBar/SideBar';
import { getCustomNodeTypes } from '../../../components/FlowChart/utils/getCustomNodeTypes';

const initialNodes = [
  {
    id: 'node-1',
    type: 'decisionNode',
    position: { x: 0, y: 0 },
    data: { label: 'something', formLabel: 'Decision' },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const UploadAreaStyle = styled.div`
  padding: 10px;
  background: #cfe2ff;
`;

const FlowChart = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>(null);
  const [isPreview, setIsPreview] = useState(false);

  const nodeTypes = useMemo(() => getCustomNodeTypes, []);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  console.log({ nodes });

  return (
    <>
      <Navigation />
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default FlowChart;
