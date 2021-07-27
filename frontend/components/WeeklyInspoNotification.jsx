import { addWeeks, isSameWeek } from "date-fns";
import { isBefore, isEqual } from "date-fns";
import { WEEKLY_INSPO } from "../lib/constants";
import CardLayout from "../components/CardLayout/CardLayout";
import { getPresenterFirstName } from "../lib/helpers";
import Avatar from "./Avatar/Avatar";

export default function WeeklyInspoNotification({ events }) {
  const weeklyInspoArr = getWeeklyInspoArr(events);

  const { currentWeekPresenter, nextWeekPresenter } =
    getWeeklyInspoPresenters(weeklyInspoArr);

  // render data
  return (
    <CardLayout
      title='Weekly Inspo'
      category='Schedule'
      width='3xl:w-4/12 lg:w-6/12 w-full'
    >
      <ul className='list'>
        <li className='list-item'>
          {currentWeekPresenter ? (
            <>
              <p>The speaker this week is </p>
              <span className='text-xl ml-1 mr-2'>
                {getPresenterFirstName(currentWeekPresenter)}
              </span>
              {currentWeekPresenter.avatar ? (
                <Avatar alt='speaker' src={currentWeekPresenter.avatar.url} />
              ) : (
                <Avatar />
              )}
            </>
          ) : (
            <p>No speaker data for this week.</p>
          )}
        </li>
        <li className='list-item'>
          {nextWeekPresenter ? (
            <>
              <p>The speaker next week is </p>
              <span className='text-xl ml-1 mr-2'>
                {getPresenterFirstName(nextWeekPresenter)}
              </span>
              {nextWeekPresenter.avatar ? (
                <Avatar alt='speaker' src={nextWeekPresenter.avatar.url} />
              ) : (
                <Avatar />
              )}
            </>
          ) : (
            <p>No speaker data available for next week.</p>
          )}
        </li>
      </ul>
      <div className='flex justify-end'>
        <a
          href='https://www.notion.so/brandae/64e1f075ef334b99a9003b188f7d050b?v=3117a7ec795b44bc806c00b4401e217a'
          target='_blank'
          rel='noopener noreferrer'
          className='link p-3 my-8 border-b border-black inline-block'
        >
          View the full schedule
        </a>
      </div>
    </CardLayout>
  );
}

function getWeeklyInspoArr(eventsArr) {
  const weeklyInspoArr = eventsArr
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

  return weeklyInspoArr;
}

function getWeeklyInspoPresenters(eventsArr) {
  let currentWeekPresenter;
  let nextWeekPresenter;

  const today = new Date();
  const nextWeekToday = addWeeks(today, 1);

  if (eventsArr.length > 0) {
    const currentWeekInArr = eventsArr.filter((event) =>
      isSameWeek(today, new Date(event.date))
    );
    const nextWeekInArr = eventsArr.filter((event) =>
      isSameWeek(nextWeekToday, new Date(event.date))
    );

    if (currentWeekInArr.length > 0) {
      const currentWeekPresenterObj = currentWeekInArr[0].member;
      currentWeekPresenter = currentWeekPresenterObj;

      if (nextWeekInArr.length > 0) {
        const nextWeekPresenterObj = nextWeekInArr[0].member;
        nextWeekPresenter = nextWeekPresenterObj;
      } else {
        nextWeekPresenter = null;
      }
    } else {
      currentWeekPresenter = null;

      if (nextWeekInArr.length > 0) {
        const nextWeekPresenterObj = nextWeekInArr[0].member;
        nextWeekPresenter = nextWeekPresenterObj;
      } else {
        nextWeekPresenter = null;
      }
    }
  }

  return { currentWeekPresenter, nextWeekPresenter };
}
