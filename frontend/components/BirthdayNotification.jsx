import React from "react";
import { isSameMonth, getMonth, getDay, getDate, isBefore } from "date-fns";
import { removeLeadingZeroInDate, mapMonth, mapWeekday } from "../lib/helpers";
import CardLayout from "../components/CardLayout/CardLayout";
import Avatar from "./Avatar/Avatar";
import PersonIcon from "@material-ui/icons/Person";

export default function BirthdayNotification({ members }) {
  const birthdayMembers = getBirthdayMembers(members);

  return (
    <CardLayout
      title='Birthday Notification'
      category='Team'
      width='3xl:w-4/12 lg:w-6/12 md:w-full'
    >
      {birthdayMembers.length === 0 ? (
        <p className='mb-4'>
          We don't have birthday celebration in this month.
        </p>
      ) : (
        <p className='mb-4'>{`We have ${birthdayMembers.length} ${
          birthdayMembers.length === 1 ? "birthday" : "birthdays"
        } 🎂  to celebrate in this month.`}</p>
      )}
      <ul className='list'>
        {birthdayMembers
          .sort((first, second) => {
            const result = isBefore(
              new Date(removeLeadingZeroInDate(first.birthday)),
              new Date(removeLeadingZeroInDate(second.birthday))
            );
            if (result) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((member, index) => (
            <li key={index} className='list-item'>
              <p className='text-xl mr-2'>{member.firstName}</p>
              {member.avatar ? (
                <Avatar alt='speaker' src={member.avatar.url} />
              ) : (
                <Avatar />
              )}
              <p className='ml-4'>
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
              </p>
            </li>
          ))}
      </ul>
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
