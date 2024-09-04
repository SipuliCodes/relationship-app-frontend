import { useState } from "react";
import {
  AuthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { Navbar, NavItem } from "react-bootstrap";

import { loginRequest } from "../../authConfig";
import UserCalendar from "./UserCalendar/UserCalendar";

const CalendarPage = () => {
  const [calendar, setCalendar] = useState("personal");

  const { instance } = useMsal();

  if (!useIsAuthenticated()) {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  }

  return (
    <div>
      <AuthenticatedTemplate>
        <Navbar className="navbarStyle w-100 d-flex justify-content-center">
          <NavItem
            role="button"
            onClick={() => setCalendar("personal")}
            className={`mx-4 ${calendar === "personal" ? "border-bottom border-2 border-primary" : ""}`}
          >
            Personal
          </NavItem>
          <NavItem
            role="button"
            onClick={() => setCalendar("shared")}
            className={`mx-4 ${calendar === "shared" ? "border-bottom border-2 border-primary" : ""}`}
          >
            Shared
          </NavItem>
        </Navbar>
        <UserCalendar calendarName={calendar} />
      </AuthenticatedTemplate>
    </div>
  );
};

export default CalendarPage;
