import React, { useState, useEffect } from "react";
import classes from "./Calendar.module.scss";
import CalendarHeader from "@/components/Calendar/Header/Header";
import useDate from "@/components/Calendar/Date/useDate";
import Day from "@/components/Calendar/Day/Day";
import OpenModal from "@/components/OpenModal/OpenModal";
import DeleteModal from "@/components/Calendar/DeleteModal/DeleteModal";

function Calendar() {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState(null);
  const [events, setEvents] = useState(
    typeof window !== "undefined" && localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events") || "")
      : []
  );

  const eventForDate = (date: string) =>
    events.find((e: any) => e.date === date);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate({ events, nav });

  return (
    <div className={classes.container}>
      <CalendarHeader
        dateDisplay={dateDisplay}
        onBack={() => setNav(nav - 1)}
        onNext={() => setNav(nav + 1)}
      />

      <div className={classes.weekdays}>
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div className={classes.calendar}>
        {days.map((d: any, index) => (
          <Day
            key={index}
            day={d}
            onClick={() => {
              if (d.value !== "padding") {
                setClicked(d.date);
              }
            }}
          />
        ))}
      </div>

      {clicked && !eventForDate(clicked) && (
        <OpenModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      )}

      {clicked && eventForDate(clicked) && (
        <DeleteModal
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e: any) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
    </div>
  );
}

export default Calendar;
