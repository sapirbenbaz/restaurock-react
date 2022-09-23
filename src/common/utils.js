import axios from 'axios';

const restaurantsUrl = 'http://localhost:8000/restaurants';

export function getRestaurantName(restaurants, reservation) {
  const restaurant = restaurants.find(
    (restaurant) =>
      restaurant.restaurantId === reservation.restaurantId
  );
  return restaurant.name;
}

export async function getRestaurants() {
  try {
    const res = await axios.get(restaurantsUrl, {
      crossdomain: true,
    });

    return res.data;
  } catch (error) {
    alert("An error occured! Couldn't fetch reservations!");
  }
}
