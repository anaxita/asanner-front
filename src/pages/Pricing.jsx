import { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import { makeHttpRequest } from '../api/makeHttpRequest';

export const Pricing = () => {
  let subID = '';

  const profile = localStorage.getItem('profile');
  if (profile) {
    const { subscription } = JSON.parse(profile);
    subID = subscription?.id;
  }

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    makeHttpRequest('GET', '/subscriptions').then((response) => {
      const { data, error } = response;

      if (error) {
        console.log('get subscriptions:', error);
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
        <Card key={plan.id} className="text-center" style={{ width: '25rem' }}>
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title className="mb-0">
              <h3 className="mb-0">{plan.name}</h3>
              <h6 className="fw-bold">
                {plan.price === 0 ? 'Бесплатно' : `${plan.price} руб./ ${plan.duration_month} месяцев`}
              </h6>
            </Card.Title>
            <ListGroup className="mb-2 text-start">
              {plan.opportunities.map((v, i) => {
                return <ListGroup.Item key={i}>{v}</ListGroup.Item>;
              })}
            </ListGroup>
            <Button
              href={!profile ? '/login' : '/payment'}
              disabled={subID === plan.id}
              variant={subID === plan.id ? 'secondary' : 'warning'}
            >
              {!profile
                ? 'Перейти'
                : subID === plan.id
                ? 'Текущий'
                : !profile.is_trial_used
                ? '7 дней бесплатно'
                : 'Перейти'}
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
