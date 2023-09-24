import { Button, Card, ListGroup } from 'react-bootstrap';

import { Footer } from './Footer';
import { Header } from './Header';

export const PricingPreview = () => {
  return (
    <>
      <div className="main bg-light">
        <div className="container vh-100 d-flex justify-content-between flex-column">
          <Header />
          <div className="d-flex align-items-center flex-column">
            <h1 className=" title">Pricing</h1>
            <div className="d-flex gap-3">
              <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Базовый</Card.Title>
                  <ListGroup className="mb-2">
                    <ListGroup.Item as="li">Преимущество 1</ListGroup.Item>
                    <ListGroup.Item as="li">Преимущество 2</ListGroup.Item>
                    <ListGroup.Item as="li">Преимущество 3</ListGroup.Item>
                  </ListGroup>
                  <Button href="/login" variant="secondary">
                    Перейти
                  </Button>
                </Card.Body>
              </Card>
              <Card className="text-center" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Премиум</Card.Title>
                  <ListGroup className="mb-2">
                    <ListGroup.Item as="li">Преимущество 1</ListGroup.Item>
                    <ListGroup.Item as="li">Преимущество 2</ListGroup.Item>
                    <ListGroup.Item as="li">Преимущество 3</ListGroup.Item>
                  </ListGroup>
                  <Button href="/login" variant="warning">
                    Перейти
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
