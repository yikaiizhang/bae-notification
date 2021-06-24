import { useState, useEffect } from "react";
import { addWeeks, isSameWeek } from "date-fns";
import { EMPTY } from "../lib/constants";

export function useDigitalReviewPresenters(eventsArr) {
  const [currentWeekPresenter, setCurrentWeekPresenter] = useState(null);
  const [nextWeekPresenter, setNextWeekPresenter] = useState(null);

  useEffect(() => {
    const today = new Date();
    const nextWeekToday = addWeeks(today, 1);

    if (eventsArr.length > 0) {
      const currentWeekInArr = eventsArr.filter((event) =>
        isSameWeek(today, new Date(event.date))
      );
      if (currentWeekInArr.length > 0) {
        const currentWeekPresenterObj = currentWeekInArr[0].member;
        setCurrentWeekPresenter(currentWeekPresenterObj);
        setNextWeekPresenter(EMPTY);
      } else {
        const nextWeekInArr = eventsArr.filter((event) =>
          isSameWeek(nextWeekToday, new Date(event.date))
        );
        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterObj = nextWeekInArr[0].member;
          setCurrentWeekPresenter(EMPTY);
          setNextWeekPresenter(nextWeekPresenterObj);
        } else {
          setCurrentWeekPresenter(null);
          setNextWeekPresenter(null);
        }
      }
    }
  }, [eventsArr]);

  return { currentWeekPresenter, nextWeekPresenter };
}
