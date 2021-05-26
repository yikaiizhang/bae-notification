import { useState, useEffect } from "react";
import { useEvents } from "../hooks";
import { isBefore, isEqual } from "date-fns";
import { DIGITAL_REVIEW, EMPTY } from "../lib/constants";
import { useDigitalReviewPresenters } from "../hooks";

export default function DigitalReviewNotification() {
  const { events, isLoading, isError } = useEvents();
  const [digitalReviewArr, setDigitalReviewArr] = useState([]);
  const { currentWeekPresenter, nextWeekPresenter } =
    useDigitalReviewPresenters(digitalReviewArr);

  useEffect(() => {
    if (events) {
      const result = events
        .filter((meeting) => meeting.name === DIGITAL_REVIEW)
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
      setDigitalReviewArr(result);
    }
  }, [events]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <>
      <div>
        {currentWeekPresenter
          ? currentWeekPresenter === EMPTY
            ? "We don't have digital review this week."
            : `The speaker of the digital review this week is ${currentWeekPresenter}`
          : "There is no speaker data for this week."}
      </div>
      <div>
        {nextWeekPresenter
          ? nextWeekPresenter === EMPTY
            ? "We don't have digital review next week."
            : `The speaker of the next digital review is ${nextWeekPresenter}`
          : "There is no speaker data for next week."}
      </div>
    </>
  );
}
