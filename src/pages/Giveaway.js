import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './giveaway.css';
import AddNewRestaurant from './AddNewRestaurant';
import { useAuthUser } from '@frontegg/react';
import { getRestaurants } from '../common/utils';
import Select from 'react-select';

export default function Giveaway() {
  const user = useAuthUser();
  const [restaurants, setRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [restaurantName, setRestaurantName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [nameOnReservation, setNameOnReservation] = useState(
    user.name
  );
  const [comments, setComments] = useState();

  useEffect(() => {
    if (!date) {
      var curr = new Date();
      curr.setDate(curr.getDate());
      setDate(curr.toISOString().substring(0, 10));
    }
  }, [date]);

  useEffect(() => {
    var curr = new Date();
    curr.setHours(
      curr.getHours() + 3 + Math.round(curr.getMinutes() / 60)
    );
    curr.setMinutes(0, 0, 0);
    setTime(curr.toISOString().substring(11, 16));
  }, []);

  const handleAddNewRestaurant = () => {
    setIsModalOpen(true);
    return;
  };

  const handleRestaurantName = (e) => {
    console.log(e);
    if (e === 'Add new restaurant') {
      handleAddNewRestaurant();
    } else {
      setRestaurantName(e);
    }
  };

  const getRestaurantId = () => {
    const restaurant = restaurants.find(
      (restaurant) => restaurant.name === restaurantName
    );

    return restaurant?.restaurantId;
  };

  const handleSubmit = async (event) => {
    const reservationsUrl = 'http://localhost:8000/reservations';
    const restuarantId = getRestaurantId();
    const json = {
      restaurantId: restuarantId,
      nameOnReservation: nameOnReservation,
      giverEmail: user?.email,
      isTaken: false,
      numberOfGuests: numberOfSeats,
      date: new Date(date + ' ' + time),
      comments: comments,
    };

    event.preventDefault();
    try {
      await axios
        .post(reservationsUrl, json, {
          crossdomain: true,
        })
        .then(() => {
          alert('Reservation created successfully!');
          window.location = '/';
        });
    } catch (error) {
      alert('An error occurd! Did not create reservation');
    }
  };

  useEffect(async () => {
    setRestaurants(await getRestaurants());
  }, []);

  return (
    <div className="giveaway">
      <h2>Giveaway your reservation</h2>
      <form>
        <Select
          options={[
            {
              value: 'Add new restaurant',
              label: 'Add new restaurant',
            },
            ...restaurants.map((restaurant) => {
              return {
                value: restaurant.name,
                label: restaurant.name,
              };
            }),
          ]}
          onChange={(e) => {
            handleRestaurantName(e.value);
          }}
        ></Select>
        {/* <button
          onClick={() => {
            handleRestaurantName('Add new restaurant');
          }}
        >
          Add new Restaurant
        </button> */}
        {/* <select
          onChange={(e) => {
            handleRestaurantName(e.target.value);
          }}
        >
          <option disabled={true} selected={true}>
            --Select a restaurant--
          </option>
          <option>Add new restaurant</option>
          {restaurants.map((restaurant) => (
            <option value={restaurant.name}>{restaurant.name}</option>
          ))}
        </select> */}
        <AddNewRestaurant
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <label>Number of guests:</label>
        <input
          type="number"
          required
          value={numberOfSeats}
          max="20"
          onChange={(e) => {
            setNumberOfSeats(e.target.value);
          }}
        />
        <label>Date:</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => {
            var ToDate = new Date();

            if (
              new Date(e.target.value).getTime() <= ToDate.getTime()
            ) {
              alert('The Date must be bigger or equal to today date');
              return false;
            }
            setDate(e.target.value);
          }}
        />
        <label>Time:</label>
        <input
          type="time"
          required
          value={time}
          onChange={(e) => {
            const hours = e.target.value.split(':')[0];

            if (hours < 8 || hours > 22) {
              alert('Time should be between 8AM to 23PM');
              return false;
            }
            setTime(e.target.value);
          }}
        />
        <label>Name on reservation:</label>
        <input
          type="text"
          required
          value={nameOnReservation}
          onChange={(e) => {
            setNameOnReservation(e.target.value);
          }}
        />
        <label>Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => {
            setComments(e.target.value);
          }}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
