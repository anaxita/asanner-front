import { Card } from 'react-bootstrap';

import { makeHttpRequest } from '../api/make_http_request';

const postPayment = (uri) => {
  makeHttpRequest('POST', `${uri}`).then((r) => {
    const { data, err } = r;
    if (err) {
      console.log(err);
    } else {
      console.log('data: ', data);
    }
  });
};

export const Payment = () => {
  return (
    <>
      <div className=" d-flex align-items-center flex-column">
        <h1 className="title"> Payment</h1>
        <div className="d-flex gap-3">
          <Card
            onClick={() => postPayment('/checkouts/stripe')}
            className="text-center"
            role="button"
            bg="dark"
            text="white"
            style={{ width: '18rem' }}
          >
            <Card.Body>
              <Card.Title>Visa, MasterCard, ApplePay, AmericanExpress</Card.Title>
            </Card.Body>
          </Card>
          <Card
            onClick={() => postPayment('/checkouts/mir')}
            className="text-center"
            role="button"
            bg="success"
            text="white"
            style={{ width: '18rem' }}
          >
            <Card.Body>
              <Card.Title>Платёжная система «Мир»</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
