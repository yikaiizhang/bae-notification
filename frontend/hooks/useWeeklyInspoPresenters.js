import { useState, useEffect } from "react";
import { nextTuesday, isSameWeek } from "date-fns";
import { getPresenterName } from "../lib/helpers";

export function useWeeklyInspoPresenters(eventsArr) {
  const [currentWeekPresenter, setCurrentWeekPresenter] = useState(null);
  const [nextWeekPresenter, setNextWeekPresenter] = useState(null);

  useEffect(() => {
    const today = new Date();
    const nextTuesdayDate = nextTuesday(today);

    if (eventsArr.length > 0) {
      const currentWeekInArr = eventsArr.filter((event) =>
        isSameWeek(today, new Date(event.date))
      );
      const nextWeekInArr = eventsArr.filter((event) =>
        isSameWeek(nextTuesdayDate, new Date(event.date))
      );

      if (currentWeekInArr.length > 0) {
        const currentWeekPresenterObj = 
          currentWeekInArr[0].member
        ;

        setCurrentWeekPresenter(currentWeekPresenterObj);

        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterObj = 
            nextWeekInArr[0].member
          ;
          setNextWeekPresenter(nextWeekPresenterObj);
        } else {
          setNextWeekPresenter(null);
        }
      } else {
        setCurrentWeekPresenter(null);

        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterObj = 
            nextWeekInArr[0].member
          ;
          setNextWeekPresenter(nextWeekPresenterObj);
        } else {
          setNextWeekPresenter(null);
        }
      }
    }
  }, [eventsArr]);

  return { currentWeekPresenter, nextWeekPresenter };
}
