export const getPresenterName = (presenter) => {
  return `${presenter.firstName} ${
    presenter.middleName ? presenter.middleName : ""
  } ${presenter.lastName}`;
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.ceil(celsius * (9 / 5)) + 32;
};
