import React, { useEffect, useState } from "react";
import moment from "moment";

const DateComponent = () => {
  // Define state variables
  const [myMoment, setMyMoment] = useState(null);
  const [parsedDate, setParsedDate] = useState(null);
  const [nextDay, setNextDay] = useState(null);
  const [twoWeeksAgo, setTwoWeeksAgo] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [formattedFrenchDate, setFormattedFrenchDate] = useState(null);
  const [relativeTime, setRelativeTime] = useState(null);
  const [isToday, setIsToday] = useState(null);
  const [notIsToDay, setNotIsTwoDay] = useState(null);
  const [short, setShort] = useState(null);
  const [Month, setIsMonth] = useState(null);
  const [isYear, setIsYear] = useState(null);

  // useEffect to run on component mount
  useEffect(() => {
    // Parsing Date
    const parsedDate = moment("2024-02-28T12:00:00");
    setParsedDate(parsedDate);
    const nowMoment = moment();
    setMyMoment(nowMoment);
    // Manipulating Dates
    const nextDay = moment().add(1, "day");
    setNextDay(nextDay);

    const twoWeeksAgo = moment().subtract(2, "weeks");
    setTwoWeeksAgo(twoWeeksAgo);

    // Formatting Dates
    const formattedDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    setFormattedDate(formattedDate);

    // Getting Date Components
    const year = moment().year();
    setYear(year);

    const month = moment().month();
    setMonth(month);

    const day = moment().date();
    setDay(day);

    // Localization
    moment.locale("fr"); // Set locale to French
    const formattedFrenchDate = moment().format("LL");
    setFormattedFrenchDate(formattedFrenchDate);

    moment.locale("fr"); // Set locale to French
    const shortFormating = moment().format("L");
    setShort(shortFormating);

    // Relative Time
    const relativeTime = moment("2024-01-28T10:00:00").fromNow();
    setRelativeTime(relativeTime);

    // Querying and Manipulating Dates
    const isToday = moment().isSame(moment(), "day");
    setIsToday(isToday);

    const NoisToday = moment().isSame(moment("2024-02-29T12:00:00"), "day");
    setNotIsTwoDay(NoisToday);
    console.log(NoisToday);

    const Month = moment().isSame(moment("2024-02-29T12:00:00"), "month");
    setIsMonth(Month);

    const Year = moment().isSame(moment("2025-02-29T12:00:00"), "year");
    setIsYear(Year);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>{myMoment && myMoment.format()}</h1>
      <h1>Moment.js Examples</h1>
      <p>Parsed Date: {parsedDate && parsedDate.toString()}</p>
      <p>Next Day: {nextDay && nextDay.toString()}</p>
      <p>Two Weeks Ago: {twoWeeksAgo && twoWeeksAgo.toString()}</p>
      <p>Formatted Date: {formattedDate}</p>
      <p>
        Year: {year}, Month: {month !== null && month + 1}, Day: {day}
      </p>
      <p>Formatted French Date Long: {formattedFrenchDate}</p>
      <p>Formatted French Date short: {short}</p>
      <p>Relative Time: {relativeTime}</p>
      <p>Is Today: {isToday !== null && isToday.toString()}</p>
      <p>Is Month: {Month !== null && Month.toString()}</p>

      <div>is today :{notIsToDay != null && notIsToDay.toString()}</div>
      <div>is year :{isYear != null && isYear.toString()}</div>
      <div> {moment(new Date()).fromNow()}</div>
    </div>
  );
};

export default DateComponent;
