import React from "react";
import { isSameMonth, getMonth, getDay, getDate } from "date-fns";
import { removeLeadingZeroInDate, mapMonth, mapWeekday } from "../lib/helpers";
import CardLayout from "../components/CardLayout";
import { Typography, List, ListItem, Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  avatar: {
    margin: "0 16px 0 6px",
  },
});

export default function BirthdayNotification({ members }) {
  const classes = useStyles();

  const birthdayMembers = getBirthdayMembers(members);

  return (
    <CardLayout title='Birthday Notification' category='Team'>
      {birthdayMembers.length === 0 ? (
        <Typography variant='body1' component='p'>
          We don't have birthday celebration in this month.
        </Typography>
      ) : (
        <Typography variant='body1' component='p'>{`We have ${
          birthdayMembers.length
        } ${
          birthdayMembers.length === 1 ? "birthday" : "birthdays"
        } to celebrate in this month`}</Typography>
      )}
      <List component='ul'>
        {birthdayMembers.map((member, index) => (
          <ListItem divider key={index}>
            <Typography variant='h6' component='p'>
              {member.firstName}
            </Typography>
            {member.avatar ? (
              <Avatar
                alt='speaker'
                src={member.avatar.url}
                className={classes.avatar}
              />
            ) : (
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            )}
            <Typography variant='body1' component='p'>
              <span> at </span>
              <span>
                {mapWeekday(
                  getDay(new Date(removeLeadingZeroInDate(member.birthday)))
                )}
              </span>
              <span>, </span>
              <span>
                {mapMonth(
                  getMonth(new Date(removeLeadingZeroInDate(member.birthday)))
                )}
              </span>
              <span> </span>
              <span>
                {getDate(new Date(removeLeadingZeroInDate(member.birthday)))}
              </span>
            </Typography>
          </ListItem>
        ))}
      </List>
    </CardLayout>
  );
}

function getBirthdayMembers(members) {
  const result = members.filter((member) => {
    if (member.birthday) {
      return isSameMonth(
        new Date(removeLeadingZeroInDate(member.birthday)),
        new Date()
      );
    }
  });
  return result;
}
