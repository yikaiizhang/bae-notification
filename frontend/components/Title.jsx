import React from "react";
import { getDay } from "date-fns";
import { getWeekday } from "../lib/helpers";

const today = new Date();
const day = getDay(today);

export default function Title() {
  return <h1>Hello 👋 it's {getWeekday(day)}.</h1>;
}
