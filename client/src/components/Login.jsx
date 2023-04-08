import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="mx-auto text-center">
        <Card.Body>
          <Card.Title>Welcome to Optimen</Card.Title>
          <hr/>
          <Card.Text>
            Welcome to the beginning of session, click on the "Login" button so
            you can start session or register, remember that to register you
            must have an email provided by the company
          </Card.Text>
          <hr/>
          <Button variant="primary" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
