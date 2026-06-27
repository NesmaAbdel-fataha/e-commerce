import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const password = searchParams.get("password");

  console.log(email);
  console.log(password);
  return (
    <Card>
      <Card.Header as="h5">Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Home;