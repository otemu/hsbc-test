import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationStyles = styled.div`
  .nav-link.active {
    text-decoration: underline;
  }
`;

const Navigation = () => (
  <NavigationStyles>
    <Nav defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Edit Mode
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/preview-mode">
          Preview Mode
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </NavigationStyles>
);

export default Navigation;
