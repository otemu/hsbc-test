import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import ReactFlow, { ReactFlowProvider, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import Navigation from '../../../components/FlowChart/components/Navigation/Navigation';
import useChart from '../../../hooks/useChart';

const FlowChart = () => {
  const { nodeTypes, reactFlowWrapper, nodes, edges, loadChart } = useChart();

  useEffect(() => {
    loadChart();
  }, [loadChart]);

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
