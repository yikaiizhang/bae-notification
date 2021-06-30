import { useState, useEffect } from "react";
import { getDay } from "date-fns";
import { getWeekday } from "../lib/helpers";

const today = new Date();
const day = getDay(today);

export default function Title() {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getWeekday(day));
  }, []);
  return <h1>Hello 👋 it's {today}.</h1>;
}
