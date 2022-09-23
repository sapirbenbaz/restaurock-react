export const MenuItems = [
  {
    id: 'reservations',
    section: 'main',
    title: 'Reservations',
    subheader:
      'Cannot make it in the end? Or just feeling spontanous?',
    details:
      'We are here to help! Click for giving away your reservation or looking for reservations that may fit you!',
    url: 'reservations',
    image: require('../../images/menu/calendar.png'),
  },
  {
    id: 'giveaway',
    section: 'reservations',
    title: 'Giveaway reservations',
    subheader:
      'Looking for giving away your reservation? You got to the right place!',
    details:
      "This is where you'll be able to giveaway your reservation and offer it to other people!",
    url: 'giveaway',
    image: require('../../images/menu/giveaway.png'),
  },
  {
    id: 'find',
    section: 'reservations',
    title: 'Find reservations',
    subheader:
      "Forgot your partner's birthday tomorrow and cannot find a table anywhere else?",
    details:
      "This is where you'll be able to giveaway your reservation and offer it to other people!",
    url: 'takeaway',
    image: require('../../images/menu/find.png'),
  },
];
