//Modulo Realizado por Luis, Josue y omar
// Importa las bibliotecas necesarias
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Login() {
  // Utiliza el hook useAuth0 para obtener la función loginWithRedirect e isAuthenticated
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // Define un estado local para isValidEmail, que indica si la dirección de correo electrónico del usuario es válida
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Define una función llamada handleLogin, que se llama cuando el usuario hace clic en el botón "Login"
  function handleLogin() {
    const email = document.getElementById("email").value;
    const emailSplit = email.split("@");
    const domain = emailSplit[emailSplit.length - 1].toLowerCase();
    const whitelist = ["optimen.com.mx"];
    const isValid = whitelist.includes(domain);

    // Actualiza el estado isValidEmail con el valor isValid
    setIsValidEmail(isValid);

    // Si el dominio es válido, llama a la función loginWithRedirect, que redirige al usuario a la página de inicio de sesión de Auth0
    if (isValid) {
      loginWithRedirect();
    }
  }

  // Si el usuario ya inició sesión, el componente no muestra nada
  if (isAuthenticated) {
    return null;
  }

  return (
    // Crea un div que se centra verticalmente y horizontalmente en la pantalla
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {/*Crea un card con el contenido del inicio de sesión*/}
      <Card className="mx-auto text-center">
        <Card.Body>
          <Card.Title>Welcome to Optimen</Card.Title>
          <hr />
          <Card.Text>
            Welcome to the beginning of the session. Enter your email to log in.
            remember that to start you must have an email provided by the
            company
          </Card.Text>
          <hr />
          {/*Crea un input para que el usuario ingrese su correo electrónico*/}
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          {/*Si el correo electrónico no es válido, muestra una alerta de error*/}
          {!isValidEmail && (
            <div className="alert alert-danger" role="alert">
              Invalid email. Please try again.
            </div>
          )}
          {/*Crea un botón para que el usuario inicie sesión*/}
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
