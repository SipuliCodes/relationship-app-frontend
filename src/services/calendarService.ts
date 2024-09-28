import axios from "axios";
import config from "../config";
import { BackendCalendarEvent } from "../interfaces/calendar";
import { Event } from "react-big-calendar";

const getAllEvents = async (calendar: string, token: string) => {
  try {
    const response = await axios.get(
      `${config.apiUrl}/calendar?calendar=${calendar}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const events = response.data.map((event: BackendCalendarEvent) => {
      return {
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        resource: {
          id: event.id,
          lat: event.latitude,
          long: event.longitude,
        },
      };
    });

    return events;
  } catch (error) {
    console.log(error);
  }
};

const addEvent = async (event: Event, calendar: string, token: string) => {
  try {
    const response = await axios.post(
      `${config.apiUrl}/calendar`,
      {
        CalendarEvent: {
          Title: event.title,
          Start: event.start,
          End: event.end,
          Longitude: event?.resource?.longitude | 0,
          Latitude: event?.resource?.latitude | 0,
        },
        Calendar: calendar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const calendarEvent = {
      title: response.data.title,
      start: new Date(response.data.start),
      end: new Date(response.data.end),
      resource: {
        id: response.data.id,
        lat: response.data.latitude,
        long: response.data.longitude,
      },
    };
    if (calendarEvent) return calendarEvent;
    throw new Error("Something went wrong in adding event");
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllEvents,
  addEvent,
};
