import { useState, useEffect } from "react";
import { nextTuesday, isSameWeek } from "date-fns";
import { getPresenterName } from "../lib/helpers";

export function useWeeklyInspoPresenters(eventsArr) {
  const [currentWeekPresenter, setCurrentWeekPresenter] = useState("");
  const [nextWeekPresenter, setNextWeekPresenter] = useState("");

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
        const currentWeekPresenterName = getPresenterName(
          currentWeekInArr[0].member
        );

        setCurrentWeekPresenter(currentWeekPresenterName);

        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterName = getPresenterName(
            nextWeekInArr[0].member
          );
          setNextWeekPresenter(nextWeekPresenterName);
        } else {
          setNextWeekPresenter(null);
        }
      } else {
        setCurrentWeekPresenter(null);

        if (nextWeekInArr.length > 0) {
          const nextWeekPresenterName = getPresenterName(
            nextWeekInArr[0].member
          );
          setNextWeekPresenter(nextWeekPresenterName);
        } else {
          setNextWeekPresenter(null);
        }
      }
    }
  }, [eventsArr]);

  return { currentWeekPresenter, nextWeekPresenter };
}
