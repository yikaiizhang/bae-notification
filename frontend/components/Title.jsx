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
  return <h1>Hello 👋 it's {today}.</h1>;
}
