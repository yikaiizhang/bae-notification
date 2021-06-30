import { addWeeks, isSameWeek } from "date-fns";
import { isBefore, isEqual } from "date-fns";
import { WEEKLY_INSPO } from "../lib/constants";
import CardLayout from "../components/CardLayout";
import { Typography, List, ListItem, Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { getPresenterFirstName } from "../lib/helpers";

const useStyles = makeStyles({
  speaker: {
    padding: "0 6px",
  },
});

export default function WeeklyInspoNotification({ events }) {
  const classes = useStyles();

  const weeklyInspoArr = getWeeklyInspoArr(events);

  const { currentWeekPresenter, nextWeekPresenter } =
    getWeeklyInspoPresenters(weeklyInspoArr);

  // render data
  return (
    <CardLayout title='Weekly Inspo' category='Schedule'>
      <List component='ul'>
        <ListItem divider>
          {currentWeekPresenter ? (
            <>
              <Typography variant='body1' component='p'>
                The speaker of the weekly inspo this week is
              </Typography>
              <Typography
                variant='h6'
                component='p'
                className={classes.speaker}
              >
                {getPresenterFirstName(currentWeekPresenter)}
              </Typography>
              {currentWeekPresenter.avatar ? (
                <Avatar alt='speaker' src={currentWeekPresenter.avatar.url} />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
            </>
          ) : (
            <Typography variant='body1' component='p'>
              There is no speaker data for this week.
            </Typography>
          )}
        </ListItem>
        <ListItem divider>
          {nextWeekPresenter ? (
            <>
              <Typography variant='body1' component='p'>
                The speaker of the next weekly inspo is
              </Typography>
              <Typography
                variant='h6'
                component='p'
                className={classes.speaker}
              >
                {getPresenterFirstName(nextWeekPresenter)}
              </Typography>
              {nextWeekPresenter.avatar ? (
                <Avatar alt='speaker' src={nextWeekPresenter.avatar.url} />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
            </>
          ) : (
            <Typography variant='body1' component='p'>
              There is no speaker data available for next week.
            </Typography>
          )}
        </ListItem>
      </List>
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
