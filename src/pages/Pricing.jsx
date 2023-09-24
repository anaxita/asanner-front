import { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { makeHttpRequest } from '../api/makeHttpRequest';

export const Pricing = () => {
  const { subscription } = JSON.parse(localStorage.getItem('profile'));

  const { plans, setPlans } = useState([]);

  useEffect(() => {
    makeHttpRequest('GET', '/plans').then((response) => {
      const { data, err } = response;

      if (err) {
        console.log('/plans error', err);
        // TODO handle error
      }

      if (data) {
        setPlans(data);
      }
    });
  }, []);

  const planCards = plans.map((plan) => {
    return (
      <Card className="text-center" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{plan.name}</Card.Title>
          <ListGroup className="mb-2">
            {plan.oppotunities.map((v) => {
              return <ListGroup.Item>{v}</ListGroup.Item>;
            })}
          </ListGroup>
          <Button disabled={subscription?.subscription_id === plan.id} variant="secondary">
            {subscription?.subscription_id === plan.id ? 'Текущий' : 'Перейти'}
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <>
      <div className="d-flex align-items-center flex-column">
        <h1 className=" title">Pricing</h1>
        <div className="d-flex gap-3">{planCards}</div>
      </div>
    </>
  );
};
