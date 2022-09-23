import React, { useState, useEffect } from 'react';
import ReservationCard from '../components/Reservation/ReservationCard';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';
import { useAuthUser } from '@frontegg/react';
import { getRestaurantName, getRestaurants } from '../common/utils';
import Select from 'react-select';

export default function Takeaway() {
  const reservationsUrl = 'http://localhost:8000/reservations';
  const restaurantsUrl = 'http://localhost:8000/restaurants';
  const user = useAuthUser();
  const [resetRestaurantFilter, setResetRestaurantFilter] =
    useState(true);
  const [resetDateFilter, setResetDateFilter] = useState(true);
  const [resetNumberOfGuetsFilter, setResetNumberOfGuetsFilter] =
    useState(true);

  const [userReservations, setUserReservations] = useState([]);
  const [nonUserReservations, setnonUserReservations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [numberOfGuetsFilter, setNumberOfGuetsFilter] = useState();
  const [restaurantFilter, setRestaurantFilter] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [restaurantName, setRestaurantName] = useState();

  useEffect(async () => {
    try {
      setRestaurants(await getRestaurants());

      await axios
        .get(reservationsUrl, { crossdomain: true })
        .then((response) => {
          setnonUserReservations(
            response.data.flatMap((reservation) => {
              return reservation.giverEmail !== user.email
                ? [reservation]
                : [];
            })
          );

          setUserReservations(
            response.data.flatMap((reservation) => {
              return reservation.giverEmail === user.email
                ? [reservation]
                : [];
            })
          );
        });
    } catch (error) {
      alert("An error occured! Couldn't fetch reservations!");
    }
  }, [reservationsUrl, restaurantsUrl]);

  useEffect(() => {
    const restaurant = restaurants.find(
      (restaurant) => restaurant.name === restaurantName
    );

    setRestaurantFilter(restaurant?.restaurantId);
  }, [restaurantName]);

  useEffect(() => {
    async function getReservationsWithFilter() {
      if (
        numberOfGuetsFilter !== undefined ||
        restaurantFilter !== undefined ||
        dateFilter !== undefined
      ) {
        var queryParams = {};

        queryParams._numberOfGuests = numberOfGuetsFilter ?? null;
        queryParams._date = dateFilter ?? null;
        queryParams._restaurantId = restaurantFilter ?? null;

        try {
          await axios
            .get(reservationsUrl, {
              crossdomain: true,
              params: queryParams,
            })
            .then((response) => {
              setnonUserReservations(
                response.data.flatMap((reservation) => {
                  return reservation.giverEmail !== user.email
                    ? [reservation]
                    : [];
                })
              );
            });
        } catch (error) {
          alert("An error occured! Couldn't fetch reservations!");
        }
      }
    }

    getReservationsWithFilter();
  }, [restaurantFilter, numberOfGuetsFilter, dateFilter]);

  const handleResetFilters = () => {
    setResetDateFilter(true);
    setResetNumberOfGuetsFilter(true);
    setResetRestaurantFilter(true);
  };

  return (
    <div z>
      <center>
        <Container style={{ paddingTop: '20px' }}>
          <h1 style={{ paddingTop: '20px' }}>
            {userReservations.length > 0
              ? 'Your reservations'
              : 'Seems like you have no reservations to offer...'}
          </h1>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: '10px' }}
          >
            {userReservations.map((reservation) => (
              <Grid item key={reservation.id} xs={12} lg={4}>
                <ReservationCard
                  reservation={reservation}
                  restaurantName={getRestaurantName(
                    restaurants,
                    reservation
                  )}
                  toTake={false}
                />
              </Grid>
            ))}
          </Grid>
          <div>
            <h1 style={{ margin: '20px' }}>
              {nonUserReservations.length > 0
                ? 'How about a spontaneous reservation?'
                : !resetDateFilter ||
                  !resetRestaurantFilter ||
                  !resetNumberOfGuetsFilter
                ? "We couldn't find any reservations that matched your preferences"
                : 'Sorry! There are no reservations to be displayed'}
            </h1>
            <form>
              <div>
                <label style={{ padding: '10px' }}>
                  Number of guests:
                </label>
                <select
                  onChange={(e) => {
                    setNumberOfGuetsFilter(e.target.value);
                    setResetNumberOfGuetsFilter(false);
                  }}
                >
                  <option
                    disabled={true}
                    selected={resetNumberOfGuetsFilter}
                  >
                    --
                  </option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(
                    (option) => (
                      <option value={option}>{option}</option>
                    )
                  )}
                </select>
                <label style={{ padding: '10px' }}>Date:</label>
                <input
                  type="date"
                  value={resetDateFilter ? '' : dateFilter}
                  onChange={(e) => {
                    var ToDate = new Date();

                    if (
                      new Date(e.target.value).getTime() <=
                      ToDate.getTime()
                    ) {
                      alert(
                        'The Date must be bigger or equal to today date'
                      );
                      return false;
                    }
                    setDateFilter(e.target.value);
                    setResetDateFilter(false);
                  }}
                />
                <label style={{ padding: '10px' }}>Restaurant:</label>
                <Select
                  options={[
                    ...restaurants.map((restaurant) => {
                      return {
                        value: restaurant.name,
                        label: restaurant.name,
                      };
                    }),
                  ]}
                  styles={{
                    container: (base) => ({
                      ...base,
                      flex: 1,
                      width: '200px',
                      display: 'inline-block',
                    }),
                  }}
                  onChange={(e) => {
                    setRestaurantName(e.value);
                    setResetRestaurantFilter(false);
                  }}
                ></Select>
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: '10px' }}
          >
            {nonUserReservations.map((reservation) => (
              <Grid item key={reservation.id} xs={12} lg={4}>
                <ReservationCard
                  reservation={reservation}
                  restaurantName={getRestaurantName(
                    restaurants,
                    reservation
                  )}
                  toTake={true}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </center>
    </div>
  );
}
