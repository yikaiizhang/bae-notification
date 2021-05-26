import { useState, useEffect } from "react";
import { useEvents, useWeeklyInspoPresenters } from "../hooks";
import { isBefore, isEqual } from "date-fns";
import { WEEKLY_INSPO } from "../lib/constants";

export default function WeeklyInspoNotification() {
  const { events, isLoading, isError } = useEvents();
  const [weeklyInspoArr, setWeeklyInspoArr] = useState([]);

  const { currentWeekPresenter, nextWeekPresenter } =
    useWeeklyInspoPresenters(weeklyInspoArr);

  useEffect(() => {
    if (events) {
      const weeklyInspoArr = events
        .filter((meeting) => meeting.name === WEEKLY_INSPO)
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (isEqual(dateA, dateB)) {
            return 0;
          }
          if (isBefore(dateA, dateB)) {
            return -1;
          } else {
            return 1;
          }
        });

      setWeeklyInspoArr(weeklyInspoArr);
    }
  }, [events]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <>
      <div>
        {currentWeekPresenter
          ? `The speaker of the weekly inspo this week is ${currentWeekPresenter}`
          : "There is no speaker data for this week."}
      </div>
      <div>
        {nextWeekPresenter
          ? `The speaker of the next weekly inspo is ${nextWeekPresenter}`
          : "There is no speaker data available for next week."}
      </div>
    </>
  );
}
