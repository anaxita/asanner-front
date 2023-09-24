import { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { makeHttpRequest } from '../api/makeHttpRequest';

export const Pricing = () => {
  let subID = '';

  const profile = localStorage.getItem('profile');
  if (profile) {
    const { subscription } = JSON.parse(profile);
    subID = subscription?.subscription_id;
  }

  const { plans, setPlans } = useState([]);

  useEffect(() => {
    makeHttpRequest('GET', '/subscriptions').then((response) => {
      const { data, err } = response;

      if (err) {
        console.log('get subscriptions:', err);
        // TODO handle error
      }

      if (data) {
        setPlans(data);
      }
    });
  }, []);

  let planCards = [];
  if (plans) {
    planCards = plans.map((plan) => {
      return (
        <Card className="text-center" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{plan.name}</Card.Title>
            <ListGroup className="mb-2">
              {plan.opportunities.map((v) => {
                return <ListGroup.Item>{v}</ListGroup.Item>;
              })}
            </ListGroup>
            <Button disabled={subID === plan.id} variant="secondary">
              {subID === plan.id ? 'Текущий' : 'Перейти'}
            </Button>
          </Card.Body>
        </Card>
      );
    });
  }

  return (
    <>
      <div className="d-flex align-items-center flex-column">
        <h1 className=" title">Pricing</h1>
        <div className="d-flex gap-3">{planCards}</div>
      </div>
    </>
  );
};
