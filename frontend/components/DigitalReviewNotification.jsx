import { useState, useEffect } from "react";
import { useEvents } from "../hooks";
import { isBefore, isEqual } from "date-fns";
import { DIGITAL_REVIEW } from "../lib/constants";
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
      <div>{`This week's weekly inspo's presenter is ${currentWeekPresenter}`}</div>
      <div>{`Next weekly inspo's presenter is ${nextWeekPresenter}`}</div>
    </>
  );
}
