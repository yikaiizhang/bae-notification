export const getPresenterName = (presenter) => {
  return `${presenter.firstName} ${
    presenter.middleName ? presenter.middleName : ""
  } ${presenter.lastName}`;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.ceil(celsius * (9 / 5)) + 32;
};

export const getWeekday = (number) => {
  switch (number) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";
  }
};
