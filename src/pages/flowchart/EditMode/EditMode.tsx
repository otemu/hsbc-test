import ReactFlow, { ReactFlowProvider, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import FlowChartForm from '../../../components/FlowChart/components/FlowChartForm/FlowChartForm';
import Navigation from '../../../components/FlowChart/components/Navigation/Navigation';
import SideBar from '../../../components/FlowChart/components/SideBar/SideBar';
import useFlowChart from '../../../hooks/useChart';

const FlowChart = () => {
  const {
    reactFlowWrapper,
    nodes,
    edges,
    nodeTypes,
    onDragOver,
    onDrop,
    handleNodeChange,
    handleLabelChange,
    dropHandler,
    saveGraph,
    onConnect,
    onNodesChange,
    onEdgesChange,
    setReactFlowInstance,
  } = useFlowChart();

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
