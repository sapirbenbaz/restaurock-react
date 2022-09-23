import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';

export default function SuccessfulGiveaway() {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (counter <= 0) {
      window.location = '/';
    }
  }, [counter]);

  return (
    <div>
      <center>
        <Container style={{ margin: '20px' }}>
          <h1 style={{ margin: '20px' }}>
            Your reservation has been successfully given!
          </h1>
          <h3 onClick={() => (window.location = '/')}>
            You will be redirected to the home page in {counter}
          </h3>
        </Container>
      </center>
    </div>
  );
}
