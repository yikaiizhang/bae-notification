import { isBefore, isEqual, addWeeks, isSameWeek } from "date-fns";
import { DIGITAL_REVIEW, EMPTY } from "../lib/constants";
import CardLayout from "../components/CardLayout/CardLayout";
import { getPresenterFirstName } from "../lib/helpers";
import Avatar from "./Avatar/Avatar";

export default function DigitalReviewNotification({ events }) {
  const digitalReviewArr = getDigitalReviewArr(events);
  const { currentWeekPresenter, nextWeekPresenter } =
    getDigitalReviewPresenters(digitalReviewArr);

  // render data
  return (
    <CardLayout
      title='Digital Review'
      category='Schedule'
      width='3xl:w-4/12 lg:w-6/12 md:w-full'
    >
      <ul className='list'>
        <li className='list-item'>
          {currentWeekPresenter ? (
            currentWeekPresenter === EMPTY ? (
              <p>No digital review in this week.</p>
            ) : (
              <>
                <p>The speaker this week is</p>
                <span className='text-xl ml-1 mr-2'>
                  {getPresenterFirstName(currentWeekPresenter)}
                </span>
                {currentWeekPresenter.avatar ? (
                  <Avatar alt='speaker' src={currentWeekPresenter.avatar.url} />
                ) : (
                  <Avatar />
                )}
              </>
            )
          ) : (
            <p>No speaker data for this week.</p>
          )}
        </li>
        <li className='list-item'>
          {nextWeekPresenter ? (
            nextWeekPresenter === EMPTY ? (
              <p>No digital review next week.</p>
            ) : (
              <>
                <p>The speaker next week is</p>
                <span className='text-xl ml-1 mr-2'>
                  {getPresenterFirstName(nextWeekPresenter)}
                </span>
                {nextWeekPresenter.avatar ? (
                  <Avatar alt='speaker' src={nextWeekPresenter.avatar.url} />
                ) : (
                  <Avatar />
                )}
              </>
            )
          ) : (
            <p>No speaker data for next week.</p>
          )}
        </li>
      </ul>
    </CardLayout>
  );
}

function getDigitalReviewArr(eventsArr) {
  const digitalReviewArr = eventsArr
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
  return digitalReviewArr;
}

function getDigitalReviewPresenters(eventsArr) {
  let currentWeekPresenter;
  let nextWeekPresenter;

  const today = new Date();
  const nextWeekToday = addWeeks(today, 1);

  if (eventsArr.length > 0) {
    const currentWeekInArr = eventsArr.filter((event) =>
      isSameWeek(today, new Date(event.date))
    );
    if (currentWeekInArr.length > 0) {
      const currentWeekPresenterObj = currentWeekInArr[0].member;
      currentWeekPresenter = currentWeekPresenterObj;
      nextWeekPresenter = EMPTY;
    } else {
      const nextWeekInArr = eventsArr.filter((event) =>
        isSameWeek(nextWeekToday, new Date(event.date))
      );
      if (nextWeekInArr.length > 0) {
        const nextWeekPresenterObj = nextWeekInArr[0].member;
        currentWeekPresenter = EMPTY;
        nextWeekPresenter = nextWeekPresenterObj;
      } else {
        currentWeekPresenter = null;
        nextWeekPresenter = null;
      }
    }
  }
  return { currentWeekPresenter, nextWeekPresenter };
}
