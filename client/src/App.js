import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "./components/Card";

function App() {
  return (
    <div class="text-center">
      <h1 class="font-weight-bold">
        Welcome to Agile Estimator
      </h1>
      <h2>
        <p>
        <Button variant="primary">Create a room</Button>
        </p>
        <p>
          or
        </p>
        <p>
        <input placeholder="Enter room ID"></input>
        <Button variant="success">Enter</Button>
        </p>
      </h2>
      <div>
        <Card number={"1"} />
      </div>
    </div>
  );
}

export default App;
