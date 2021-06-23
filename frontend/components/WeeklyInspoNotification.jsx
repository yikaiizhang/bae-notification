import { useState, useEffect } from "react";
import { useEvents, useWeeklyInspoPresenters } from "../hooks";
import { isBefore, isEqual } from "date-fns";
import { WEEKLY_INSPO } from "../lib/constants";
import CardLayout from "../components/CardLayout";
import { Typography, List, ListItem, Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { getPresenterFirstName } from "../lib/helpers";
import { getStrapiURL } from "../lib/api";

const useStyles = makeStyles({
  speaker: {
    padding: "0 6px",
  },
});

export default function WeeklyInspoNotification() {
  const classes = useStyles();
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
                <Avatar
                  alt='speaker'
                  src={getStrapiURL(currentWeekPresenter.avatar.url)}
                />
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
                <Avatar
                  alt='speaker'
                  src={getStrapiURL(nextWeekPresenter.avatar.url)}
                />
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
