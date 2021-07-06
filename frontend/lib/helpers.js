export const getPresenterFullName = (presenter) => {
  return `${presenter.firstName} ${
    presenter.middleName ? presenter.middleName : ""
  } ${presenter.lastName}`;
};

export const getPresenterFirstName = (presenter) => {
  return presenter.firstName;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.ceil(celsius * (9 / 5)) + 32;
};

export const removeLeadingZeroInDate = (date) => {
  if (date) {
    return date.replace(/-0+/g, "-");
  }
};

export const mapMonth = (number) => {
  switch (number) {
    case 0:
      return "Jan";

    case 1:
      return "Feb";

    case 2:
      return "Mar";

    case 3:
      return "Apr";

    case 4:
      return "May";

    case 5:
      return "Jun";

    case 6:
      return "Jul";

    case 7:
      return "Aug";

    case 8:
      return "Sep";

    case 9:
      return "Oct";

    case 10:
      return "Nov";

    case 11:
      return "Dec";
  }
};

export const mapWeekday = (number) => {
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
