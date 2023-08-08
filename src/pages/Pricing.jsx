import { Button, Card, ListGroup } from 'react-bootstrap';

export const Pricing = () => {
  // const { is_premium } = JSON.parse(localStorage.getItem('user'));

  return (
    <>
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
              {/* <Button disabled={!is_premium} variant="secondary">
                {is_premium ? 'Перейти' : 'Текущий'}
              </Button> */}
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

              {/* <Button href="/payment" disabled={is_premium} variant="warning">
                {is_premium ? 'Текущий' : 'Перейти'}
              </Button> */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
