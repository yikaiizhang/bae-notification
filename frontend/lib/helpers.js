export const getPresenterName = (presenter) => {
  return `${presenter.firstName} ${
    presenter.middleName ? presenter.middleName : ""
  } ${presenter.lastName}`;
};
