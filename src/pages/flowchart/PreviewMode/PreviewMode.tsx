import { useRef, useMemo, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Navigation from '../../../components/FlowChart/components/Navigation/Navigation';
import { FLOW_CHART_STORAGE_NAME } from '../../../components/FlowChart/utils/constants';
import { getCustomNodeTypes } from '../../../components/FlowChart/utils/getCustomNodeTypes';

const FlowChart = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  useEffect(() => {
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
  }, [setEdges, setNodes]);

  const nodeTypes = useMemo(() => getCustomNodeTypes, []);
  const hasPreviewData = nodes.length > 0;

  return (
    <>
      <Navigation />
      {!hasPreviewData && (
        <Alert variant={'danger'}>
          No Graph data to preview, please save graph in edit mode
        </Alert>
      )}
      {hasPreviewData && (
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
      )}
    </>
  );
};

export default FlowChart;
