import { useState, useEffect } from "react";
import { getDay } from "date-fns";
import { mapWeekday } from "../lib/helpers";

const today = new Date();
const day = getDay(today);

export default function Title() {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(mapWeekday(day));
  }, []);
  return (
    <div className='3xl:w-8/12 lg:w-6/12 w-full flex justify-center items-center hello'>
      <p className='text-2xl md:text-4xl text-center'>Hello 👋 it's {today}.</p>
    </div>
  );
}
