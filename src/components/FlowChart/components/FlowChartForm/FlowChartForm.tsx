import {
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
  Button,
} from 'react-bootstrap';
import { Node } from 'reactflow';
import { TChangeEvent, TDragEvent, TFormEvent } from '../../types/types';

interface Props {
  nodes: Node[];
  handleLabelChange: TChangeEvent;
  handleNodeChange: TChangeEvent;
  dropHandler: TDragEvent;
  saveGraph: TFormEvent;
}

const FlowChartForm: React.FC<Props> = ({
  nodes,
  handleLabelChange,
  handleNodeChange,
  dropHandler,
  saveGraph,
}) => (
  <Form onSubmit={saveGraph}>
    <Container>
      {nodes.map((node: Node) => {
        const { id } = node;
        const isUploadField = node.type === 'decisionNode';

        return (
          <Row key={id}>
            <Col sm={12} md={{ span: 8, offset: 2 }}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Label:</InputGroup.Text>
                <Form.Control
                  value={node.data.formLabel}
                  onChange={handleLabelChange(id)}
                />
              </InputGroup>

              {!isUploadField && (
                <InputGroup className="mb-3">
                  <InputGroup.Text>Text Area:</InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    value={node.data.label}
                    onChange={handleNodeChange(id)}
                  />
                </InputGroup>
              )}
              {isUploadField && (
                <Alert
                  onDrop={dropHandler(id)}
                  onDragOver={(e) => e.preventDefault()}
                  className="mb-3"
                >
                  Upload or Drag your files here
                </Alert>
              )}
            </Col>
          </Row>
        );
      })}

      <Button variant="primary" type="submit">
        Save Graph
      </Button>
    </Container>
  </Form>
);

export default FlowChartForm;
