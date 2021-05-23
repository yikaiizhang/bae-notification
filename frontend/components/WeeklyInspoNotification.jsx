import { useState, useEffect } from "react";
import { useEvents } from "../hooks";
import { isSameWeek, isBefore, isEqual } from "date-fns";
import { WEEKLY_INSPO } from "../lib/constants";
import { getPresenterName } from "../lib/helpers";

export default function WeeklyInspoNotification() {
  const { events, isLoading, isError } = useEvents();

  const [currentWeekPresenter, setCurrentWeekPresenter] = useState("");
  const [nextWeekPresenter, setNextWeekPresenter] = useState("");
  const [weekAfterNextWeekPresenter, setWeekAfterNextWeekPresenter] =
    useState("");

  const [number, setNumber] = useState(0);
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
      // console.log(weeklyInspoArr);
      const today = new Date();
      const currentWeekIndex = weeklyInspoArr.findIndex((meet) =>
        isSameWeek(new Date(meet.date), today)
      );
      if (currentWeekIndex >= 0) {
        const currentWeekPresenterObj = weeklyInspoArr[currentWeekIndex].member;
        const nextWeekPresenterObj =
          weeklyInspoArr[currentWeekIndex + 1].member;
        const weekAfterNextWeekPresenterObj =
          weeklyInspoArr[currentWeekIndex + 2].member;
        const currentWeekPresenterName = getPresenterName(
          currentWeekPresenterObj
        );
        const nextWeekPresenterName = getPresenterName(nextWeekPresenterObj);
        const weekAfterNextWeekPresenterName = getPresenterName(
          weekAfterNextWeekPresenterObj
        );
        setCurrentWeekPresenter(currentWeekPresenterName);
        setNextWeekPresenter(nextWeekPresenterName);
        setWeekAfterNextWeekPresenter(weekAfterNextWeekPresenterName);
      }
    }
  }, [events]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <>
      <div>{`This week's weekly inspo's presenter is ${currentWeekPresenter}`}</div>
      <div>{`Next weekly inspo's presenter is ${nextWeekPresenter}`}</div>
      <div>{`The week after next weekly inspo's presenter is ${weekAfterNextWeekPresenter}`}</div>
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        {number}
      </button>
    </>
  );
}
