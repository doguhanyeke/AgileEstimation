import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import CardsPanel from './components/CardSelection/CardsPanel';

function App() {
  const [username, setUserName] = useState("Deli")

  const handleUserNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    setUserName(event.target.username.value)
  }

  return (
    <div className="text-center">
      <h1 className="font-weight-bold">
        Welcome to Agile Estimator
      </h1>

      <div className="text-left">
        <p>
          Scrum room id: cryrtbn
        </p>
        <p>
          Username: {username}
        </p>
      </div>
      <div className="text-left">
        <form onSubmit={handleUserNameChange}>
        <input name="username"></input>
        <button type="submit">Change username</button>
        </form>
      </div>

      <h2>
        <div>
          <Button variant="primary">Create a room</Button>
        </div>
        <p>
          or
        </p>
        <p>
        <input placeholder="Enter room ID"></input>
        <Button variant="success">Enter</Button>
        </p>
      </h2>
      <div>
        <CardsPanel/>
      </div>
    </div>
  );
}

export default App;
