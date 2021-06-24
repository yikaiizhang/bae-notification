import { useState, useEffect } from "react";
import { useEvents } from "../hooks";
import { isBefore, isEqual } from "date-fns";
import { DIGITAL_REVIEW, EMPTY } from "../lib/constants";
import { useDigitalReviewPresenters } from "../hooks";
import CardLayout from "../components/CardLayout";
import { Typography, List, ListItem, Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { getPresenterFirstName } from "../lib/helpers";

const useStyles = makeStyles({
  speaker: {
    padding: "0 6px",
  },
});

export default function DigitalReviewNotification() {
  const classes = useStyles();
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

  if (isError) return <div>Failed to load.</div>;
  if (isLoading)
    return (
      <div style={{ margin: "16px" }}>
        <Skeleton variant='rect' width={484} height={230} />
      </div>
    );

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
