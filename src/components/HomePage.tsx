import { Button } from "react-bootstrap";
import {
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { loginRequest } from "../authConfig";

interface CustomPayload extends JwtPayload {
  given_name?: string;
}

const HomePage = () => {
  const idTokenKey =
    "6510a378-73f6-477c-8c12-d33fb12aa216-b2c_1_signupsignin.b06aa5b7-289c-424e-96c3-b5a38c2c6033-relationshipappusers.b2clogin.com-idtoken-faf553d8-0611-48e4-a15b-2a7cfbc14889-b2c_1_signupsignin---";
  const idTokenObject = sessionStorage.getItem(idTokenKey);
  let name;
  let greeting;
  const time = new Date().getHours();
  if (5 <= time && time < 12) greeting = "Good morning";
  else if (12 <= time && time < 18) greeting = "Good afternoon";
  else if (18 <= time && time < 22) greeting = "Good evening";
  else greeting = "Why are you awake?";

  if (idTokenObject) {
    const idToken = JSON.parse(idTokenObject).secret;
    console.log("ID Token:", idToken);
    name = jwtDecode<CustomPayload>(idToken).given_name;
  } else {
    console.log("ID Token not found in sessionStorage.");
  }
  const { instance } = useMsal();

  const handleSignUp = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };
  return (
    <div>
      <UnauthenticatedTemplate>
        <div className="container d-flex flex-column align-items-start justify-content-between h-100">
          <h1 className="">
            Your Relationship, Organized: Discover CouplerApp!
          </h1>
          <h4>
            The ultimate web platform for couples to plan, manage tasks, and
            cherish memories together.
          </h4>
          <div className=" d-flex flex-column align-items-center m-5 p-2 border border">
            <p>
              CouplerApp is here to help couples stay organized, connected, and
              focused on what matters most. Whether you’re planning your next
              adventure, managing shared to-dos, or reliving beautiful memories,
              CouplerApp keeps everything in one convenient place — right in
              your browser.
            </p>
            <Button onClick={handleSignUp}>Sign up now!</Button>
          </div>
        </div>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <div className="d-flex flex-column align-items-center">
          <h1>
            {greeting} {name}
          </h1>
          <h2>How is your relationship today?</h2>
        </div>
      </AuthenticatedTemplate>
    </div>
  );
};

export default HomePage;
