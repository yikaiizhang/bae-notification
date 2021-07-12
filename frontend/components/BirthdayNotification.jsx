import React from "react";
import { getYear, getMonth, getDay, getDate, isBefore } from "date-fns";
import { removeLeadingZeroInDate, mapMonth, mapWeekday } from "../lib/helpers";
import CardLayout from "../components/CardLayout/CardLayout";
import Avatar from "./Avatar/Avatar";

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
          .map((member, index) => {
            const month = getMonth(
              new Date(removeLeadingZeroInDate(member.birthday))
            );
            const date = getDate(
              new Date(removeLeadingZeroInDate(member.birthday))
            );
            const year = getYear(new Date());

            return (
              <li key={index} className='list-item'>
                <p className='text-xl mr-2'>{member.firstName}</p>
                {member.avatar ? (
                  <Avatar alt='speaker' src={member.avatar.url} />
                ) : (
                  <Avatar />
                )}
                <p className='ml-4'>
                  <span> on </span>
                  <span>
                    {mapWeekday(
                      getDay(new Date(`${year}-${month + 1}-${date}`))
                    )}
                  </span>
                  <span>, </span>
                  <span>{mapMonth(month)}</span>
                  <span> </span>
                  <span>{date}</span>
                </p>
              </li>
            );
          })}
      </ul>
    </CardLayout>
  );
}

function getBirthdayMembers(members) {
  const result = members.filter((member) => {
    if (member.birthday) {
      return (
        getMonth(new Date(removeLeadingZeroInDate(member.birthday))) ===
        getMonth(new Date())
      );
    }
    return;
  });
  return result;
}
