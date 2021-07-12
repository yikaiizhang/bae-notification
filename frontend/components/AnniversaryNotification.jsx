import React from "react";
import { getYear, getMonth, getDay, getDate, isBefore } from "date-fns";
import { removeLeadingZeroInDate, mapMonth, mapWeekday } from "../lib/helpers";
import CardLayout from "../components/CardLayout/CardLayout";
import Avatar from "./Avatar/Avatar";

export default function AnniversaryNotification({ members }) {
  const anniversaryMembers = getAnniversaryMembers(members);

  return (
    <CardLayout
      title='Anniversary Notification'
      category='Team'
      width='3xl:w-4/12 lg:w-6/12 md:w-full'
    >
      {anniversaryMembers.length === 0 ? (
        <p className='mb-4'>
          We don't have anniversary celebration in this month.
        </p>
      ) : (
        <p className='mb-4'>{`We have ${anniversaryMembers.length} ${
          anniversaryMembers.length === 1 ? "anniversary" : "anniversaries"
        } 🎉 to celebrate in this month.`}</p>
      )}
      <ul className='list'>
        {anniversaryMembers
          .sort((first, second) => {
            const result = isBefore(
              new Date(removeLeadingZeroInDate(first.firstDayOfWork)),
              new Date(removeLeadingZeroInDate(second.firstDayOfWork))
            );
            if (result) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((member, index) => {
            const firstDayOfWork = removeLeadingZeroInDate(
              member.firstDayOfWork
            );
            const month = getMonth(new Date(firstDayOfWork));
            const date = getDate(new Date(firstDayOfWork));
            const year = getYear(new Date(firstDayOfWork));
            const currentYear = getYear(new Date());
            const anniversaryYear = currentYear - year;
            return (
              <li key={index} className='list-item'>
                <p className='text-xl mr-2'>{member.firstName}</p>
                {member.avatar ? (
                  <Avatar alt='speaker' src={member.avatar.url} />
                ) : (
                  <Avatar />
                )}
                <p className='ml-4'>
                  <span>{`${anniversaryYear} ${
                    anniversaryYear > 1 ? "Years" : "Year"
                  } Anniversary`}</span>
                  <span> at Shopify on </span>
                  <span>
                    {mapWeekday(
                      getDay(new Date(`${currentYear}-${month + 1}-${date}`))
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

function getAnniversaryMembers(members) {
  const result = members.filter((member) => {
    if (member.firstDayOfWork) {
      return (
        getMonth(new Date(removeLeadingZeroInDate(member.firstDayOfWork))) ===
        getMonth(new Date())
      );
    }
    return;
  });
  return result;
}
