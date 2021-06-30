import { isBefore, isEqual, addWeeks, isSameWeek } from "date-fns";
import { DIGITAL_REVIEW, EMPTY } from "../lib/constants";
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

export default function DigitalReviewNotification({ events }) {
  const classes = useStyles();

  const digitalReviewArr = getDigitalReviewArr(events);
  const { currentWeekPresenter, nextWeekPresenter } =
    getDigitalReviewPresenters(digitalReviewArr);

  // render data
  return (
    <CardLayout title='Digital Review' category='Schedule'>
      <List component='ul'>
        <ListItem divider>
          {currentWeekPresenter ? (
            currentWeekPresenter === EMPTY ? (
              <Typography variant='body1' component='p'>
                There is no digital review this week.
              </Typography>
            ) : (
              <>
                <Typography variant='body1' component='p'>
                  The speaker of the digital review this week is
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
            )
          ) : (
            <Typography variant='body1' component='p'>
              There is no speaker data for this week.
            </Typography>
          )}
        </ListItem>
        <ListItem divider>
          {nextWeekPresenter ? (
            nextWeekPresenter === EMPTY ? (
              <Typography variant='body1' component='p'>
                There is no digital review next week.
              </Typography>
            ) : (
              <>
                <Typography variant='body1' component='p'>
                  The speaker of the digital review next week is
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
            )
          ) : (
            <Typography variant='body1' component='p'>
              There is no speaker data for next week.
            </Typography>
          )}
        </ListItem>
      </List>
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
