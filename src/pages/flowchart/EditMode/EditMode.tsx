import { parse } from 'node:path/win32';
import {
  useState,
  useRef,
  useCallback,
  DragEvent,
  useMemo,
  ChangeEvent,
  FormEvent,
} from 'react';
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
import FlowChartForm from '../../../components/FlowChart/components/FlowChartForm/FlowChartForm';
import Navigation from '../../../components/FlowChart/components/Navigation/Navigation';
import SideBar from '../../../components/FlowChart/components/SideBar/SideBar';
import { FLOW_CHART_STORAGE_NAME } from '../../../components/FlowChart/utils/constants';
import { getCustomNodeTypes } from '../../../components/FlowChart/utils/getCustomNodeTypes';
import { getTimeStamp } from '../../../components/FlowChart/utils/getTimeStamp';

let id = 0;
const getId = () => `dndnode_${id++}`;

const UploadAreaStyle = styled.div`
  padding: 10px;
  background: #cfe2ff;
`;

const FlowChart = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>(null);

  const nodeTypes = useMemo(() => getCustomNodeTypes, []);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const dragData = JSON.parse(
        event.dataTransfer.getData('application/reactflow')
      );

      console.log({ dragData });

      const { label, type } = dragData;

      console.log({ type });
      console.log(typeof type);

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        console.log('hit here');
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label, formLabel: label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleNodeChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      console.log(val);

      setNodes(
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: val } }
            : node
        )
      );
    };

  const handleLabelChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      console.log(val);

      setNodes(
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, formLabel: val } }
            : node
        )
      );
    };

  const dropHandler = (id: string) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileName = e.dataTransfer?.files?.[0]?.name;
    console.log('e.dataTransfer', e.dataTransfer.files);

    const formData = new FormData();
    formData.set('upload', e.dataTransfer?.files?.[0], fileName);

    console.log(formData);

    if (fileName) {
      setNodes(
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: fileName } }
            : node
        )
      );
    }
  };

  const saveGraph = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        const storageName = FLOW_CHART_STORAGE_NAME;

        const hasStorage = localStorage.getItem(storageName);
        const flowChartsData = hasStorage ? JSON.parse(hasStorage) : [];
        flowChartsData.push({ id: getTimeStamp(), flow });
        localStorage.setItem(storageName, JSON.stringify(flowChartsData));
      }
    },
    [reactFlowInstance]
  );

  return (
    <>
      <Navigation />

      <div className="dndflow">
        <SideBar />
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      {nodes.length > 0 && (
        <FlowChartForm
          nodes={nodes}
          handleNodeChange={handleNodeChange}
          handleLabelChange={handleLabelChange}
          dropHandler={dropHandler}
          saveGraph={saveGraph}
        />
      )}
    </>
  );
};

export default FlowChart;
