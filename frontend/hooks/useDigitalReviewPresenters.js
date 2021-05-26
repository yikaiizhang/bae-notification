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

    if (eventsArr.length > 0) {
      const currentWeekInArr = eventsArr.filter((event) =>
        isSameWeek(today, new Date(event.date))
      );
      if (currentWeekInArr.length > 0) {
        const currentWeekPresenterName = getPresenterName(
          currentWeekInArr[0].member
        );
        setCurrentWeekPresenter(currentWeekPresenterName);
        setNextWeekPresenter(EMPTY);
      } else {
        const nextWeekInArr = eventsArr.filter((event) =>
          isSameWeek(nextFridayDate, new Date(event.date))
        );
        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterName = getPresenterName(
            nextWeekInArr[0].member
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
