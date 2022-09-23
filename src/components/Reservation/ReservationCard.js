import {
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Typography,
} from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { useAuthUser } from '@frontegg/react';

export default function ReservationCard({
  reservation,
  restaurantName,
  toTake,
}) {
  const user = useAuthUser();
  const reservationsUrl = 'http://localhost:8000/reservations';
  const formatDate = (date) => {
    const dateAsDate = new Date(date);

    return (
      dateAsDate.getDate().toString() +
      '-' +
      dateAsDate.toLocaleDateString().split('/')[0] +
      '-' +
      dateAsDate.getFullYear().toString()
    );
  };

  const formatTime = (date) => {
    const dateAsDate = new Date(date);
    return (
      dateAsDate.getHours() +
      ':' +
      (dateAsDate.getMinutes() < 10
        ? '0' + dateAsDate.getMinutes()
        : dateAsDate.getMinutes())
    );
  };

  const handleTakenReservation = async () => {
    try {
      await axios.patch(
        reservationsUrl + '/' + reservation.id,
        { takerEmail: user.email },
        { crossdomain: true }
      );

      alert(
        "We've just sent an email to the owner of the reservation! Check your mail to see if they approved it"
      );
      window.location = '/';
    } catch (error) {
      debugger;
      alert('An error occurd! Did not create reservation');
    }
  };

  const handleDeleteMyReservation = async () => {
    try {
      await axios.delete(reservationsUrl + '/' + reservation.id, {
        crossdomain: true,
      });

      alert("We're deleting your reservation right away!");
      window.location = '/';
    } catch (error) {
      debugger;
      alert('An error occurd! Could not delete your reservation');
    }
  };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title={restaurantName}
          subheader={`${formatDate(reservation.date)} ${formatTime(
            reservation.date
          )}`}
        />
        <CardContent>
          <Typography variant="body" color="textSecondary">
            Number of guests: {reservation.numberOfGuests}
          </Typography>
        </CardContent>
        {reservation?.comments && toTake && (
          <CardContent>
            <Typography variant="body" color="textSecondary">
              Comments: {reservation.comments}
            </Typography>
          </CardContent>
        )}
        <CardActions style={{ justifyContent: 'center' }}>
          {toTake ? (
            <Button
              size="small"
              color="f2a283"
              onClick={handleTakenReservation}
            >
              Interested!
            </Button>
          ) : (
            <Button
              size="small"
              color="f2a283"
              onClick={handleDeleteMyReservation}
            >
              Delete my reservation
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
