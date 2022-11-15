import { stringify } from 'querystring';
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { addEdge, Connection, useEdgesState, useNodesState } from 'reactflow';
import {
  FLOW_DATA_TRANSFER_NAME,
  FLOW_CHART_STORAGE_NAME,
} from '../components/FlowChart/utils/constants';
import { getCustomNodeTypes } from '../components/FlowChart/utils/getCustomNodeTypes';
import { getTimeStamp } from '../components/FlowChart/utils/getTimeStamp';

const useChart = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodeTypes = useMemo(() => getCustomNodeTypes, []);

  let id = 0;
  const getId = useCallback(() => `id_${id++}`, [id]);

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
        event.dataTransfer.getData(FLOW_DATA_TRANSFER_NAME)
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
    [getId, reactFlowInstance, setNodes]
  );

  const handleNodeChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

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

  const loadChart = () => {
    const hasStorage = localStorage.getItem(FLOW_CHART_STORAGE_NAME);
    const flowChartsData = hasStorage ? JSON.parse(hasStorage) : [];

    if (!flowChartsData.length) return;
    const {
      flow: { nodes, edges },
    } = flowChartsData.reduce((a: { id: number }, b: { id: number }) =>
      a.id > b.id ? a : b
    );

    setNodes(nodes);
    setEdges(edges);
  };

  return {
    nodes,
    edges,
    reactFlowInstance,
    reactFlowWrapper,
    nodeTypes,
    getId,
    onNodesChange,
    onEdgesChange,
    onDragOver,
    saveGraph,
    dropHandler,
    handleLabelChange,
    handleNodeChange,
    onDrop,
    onConnect,
    setReactFlowInstance,
    loadChart,
  };
};

export default useChart;
