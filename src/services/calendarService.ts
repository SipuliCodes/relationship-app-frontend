import axios from "axios";
import config from "../config";
import { BackendCalendarEvent } from "../interfaces/calendar";

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

export default {
  getAllEvents,
};
