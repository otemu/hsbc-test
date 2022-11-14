// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//TODO

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

const FlowChartForm: React.FC = ({
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
                <InputGroup className="mb-3">
                  <div>
                    <Form.Control
                      name="upload"
                      type="file"
                      onChange={handleLabelChange(id)}
                      className="rounded-0 rounded-top"
                    />
                    <Alert
                      onDrop={dropHandler(id)}
                      onDragOver={(e) => e.preventDefault()}
                      className="rounded-0 rounded-bottom"
                    >
                      Upload or Drag your files here
                    </Alert>
                  </div>
                </InputGroup>
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
