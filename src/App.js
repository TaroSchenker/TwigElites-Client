import './App.css';
import {Container, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container  >
    <Row>
    <Col s={12} className=" bg-warning">1 of 3</Col>
    </Row>
      <Row className="mt-4" style={{height: '80vh'}}>
        <Col s={12} md={3} className="mx-2 bg-success">1 of 3</Col>
        <Col s={12} md={5} className="mx-2 bg-info">Map</Col>
        <Col s={12} md={3} className="mx-2 bg-danger">3 of 3</Col>
      </Row>

    </Container>
  );
}

export default App;
