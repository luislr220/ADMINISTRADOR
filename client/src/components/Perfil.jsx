import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';

export default function Perfil() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
    
  }
  return (
    isAuthenticated && (
      <div>
        <Card style={{ width: "30rem" }} className="d-flex justify-content-center align-items-center mx-auto text-center">
          <Card.Img variant="top" src={user.picture} alt={user.name}/>
          
          <Card.Body>
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Text>email: {user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  );
}
