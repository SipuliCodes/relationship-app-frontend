import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { Button } from "react-bootstrap";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./UserCalendar.scss";

import AddEventForm from "./AddEventForm/AddEventForm";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface UserCalendarProps {
  calendarName: string;
}

const UserCalendar: React.FC<UserCalendarProps> = ({ calendarName }) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  const [personalEvents, setPersonalEvents] = useState<Event[]>([
    {
      title: "personal",
      start: new Date(2024, 8, 3, 12),
      end: new Date(2024, 8, 3, 15),
      resource: {
        id: 2,
      },
    },
  ]);

  const [sharedEvents, setSharedEvents] = useState<Event[]>([
    {
      title: "shared test",
      start: new Date(2024, 8, 3, 12),
      end: new Date(2024, 8, 3, 15),
      resource: {
        id: 1,
      },
    },
    {
      title: "shared",
      start: new Date(2024, 8, 5, 12),
      end: new Date(2024, 8, 5, 15),
      resource: {
        id: 2,
      },
    },
  ]);

  useEffect(() => {
    if (calendarName == "personal") {
      setEvents(personalEvents);
    }
    if (calendarName == "shared") {
      setEvents(sharedEvents);
    }
  }, [calendarName, personalEvents, sharedEvents]);

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const events = currentEvents.map((currentEvent) => {
        return currentEvent.resource.id === data.event.resource.id
          ? { ...data.event, start: new Date(start), end: new Date(end) }
          : currentEvent;
      });
      return events;
    });
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    const { start, end } = data;

    setEvents((currentEvents) => {
      const events = currentEvents.map((currentEvent) =>
        currentEvent.resource.id === data.event.resource.id
          ? { ...data.event, start: new Date(start), end: new Date(end) }
          : currentEvent,
      );
      return events;
    });
  };

  const handleElementChange = () => {
    setShowCalendar(!showCalendar);
  };

  const addEvent = (event: Event) => {
    console.log(event);
    if (calendarName === "personal") {
      setPersonalEvents([...personalEvents, event]);
    }
    if (calendarName === "shared") {
      setSharedEvents([...sharedEvents, event]);
    }
    handleElementChange();
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      {showCalendar && (
        <>
          <DnDCalendar
            defaultView="week"
            localizer={localizer}
            events={events}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            style={{ height: "65vh", width: "80%" }}
          />
          <Button onClick={handleElementChange} className="mt-2">
            Add event
          </Button>
        </>
      )}
      {!showCalendar && (
        <AddEventForm
          handleElementChange={handleElementChange}
          addEvent={addEvent}
          id={events.length}
        />
      )}
    </div>
  );
};

const DnDCalendar = withDragAndDrop(Calendar);

export default UserCalendar;
