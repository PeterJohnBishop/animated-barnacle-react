import { Container, Card, Row, Col } from "react-bootstrap";

export default function MainCards() {
        return (
      <Container id="cards" className="my-5">
        <Row>
          {["Frontend", "Backend", "API"].map((title, i) => (
            <Col md={4} key={i} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=Card+${title}`} />
                <Card.Body>
                  <Card.Title>Card {title}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
        );
}