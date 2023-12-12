import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>404 Not Found</p>
      </Alert>
    </>
  );
};

export default NotFound;
