import { useState, useEffect } from "react";
import { nextFriday, isSameWeek } from "date-fns";
import { getPresenterName } from "../lib/helpers";
import { EMPTY } from "../lib/constants";

export function useDigitalReviewPresenters(eventsArr) {
  const [currentWeekPresenter, setCurrentWeekPresenter] = useState("");
  const [nextWeekPresenter, setNextWeekPresenter] = useState("");

  useEffect(() => {
    const today = new Date();
    const nextFridayDate = nextFriday(today);

    if (eventsArr) {
      const currentFridayInArr = eventsArr.filter((event) =>
        isSameWeek(today, new Date(event.date))
      );
      if (currentFridayInArr.length > 0) {
        const currentWeekPresenterName = getPresenterName(
          currentFridayInArr[0].member
        );
        setCurrentWeekPresenter(currentWeekPresenterName);
        setNextWeekPresenter(EMPTY);
      } else {
        const nextFridayInArr = eventsArr.filter((event) =>
          isSameWeek(nextFridayDate, new Date(event.date))
        );
        if (nextFridayInArr.length > 0) {
          const nextWeekPresenterName = getPresenterName(
            nextFridayInArr[0].member
          );
          setCurrentWeekPresenter(EMPTY);
          setNextWeekPresenter(nextWeekPresenterName);
        } else {
          setCurrentWeekPresenter(null);
          setNextWeekPresenter(null);
        }
      }
    }
  }, [eventsArr]);

  return { currentWeekPresenter, nextWeekPresenter };
}
