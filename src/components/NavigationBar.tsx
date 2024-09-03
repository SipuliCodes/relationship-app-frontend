import { Nav, Navbar, Button } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";

import "./NavigationBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

export const NavigationBar = () => {
  const { instance } = useMsal();

  const [isDarkTheme, setIsDarkTheme] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const newTheme = isDarkTheme ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, [isDarkTheme]);

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <Navbar className="navbarStyle overflow-auto d-flex justify-content-between flex-row bg-body-primary margin px-4">
        <a className="navbar-brand" href="/">
          Couplerapp
        </a>
        <AuthenticatedTemplate>
          <div className="d-flex flex-row justify-content-space-around">
            <Nav.Link className="navbarButton mx-4" href="/todolist">
              Todolist
            </Nav.Link>
            <Nav.Link className="navbarButton mx-4" href="/calendar">
              Calendar
            </Nav.Link>
            <Nav.Link className="navbarButton mx-4" href="/Memories">
              Memories
            </Nav.Link>
          </div>
          <Button
            className="error ms-auto me-4 sign-out-button"
            onClick={handleLogoutRedirect}
          >
            Sign out
          </Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button className="ms-auto me-4 " onClick={handleLoginRedirect}>
            Sign In
          </Button>
        </UnauthenticatedTemplate>
        <Button onClick={toggleTheme}>
          <i className={`bi bi-sun ${isDarkTheme ? "" : "d-none"}`}></i>
          <i className={`bi bi-moon ${isDarkTheme ? "d-none" : ""}`}></i>
        </Button>
      </Navbar>
    </>
  );
};
