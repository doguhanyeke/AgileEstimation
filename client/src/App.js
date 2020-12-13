import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import CardsPanel from './components/CardSelection/CardsPanel';
import UserTable from './components/UserTable';
import ResultTable from './components/ResultTable';

function App() {
  const [username, setUserName] = useState("Deli")

  // round states, 3 options
  // "start" round: only names
  // "voting" round: voted or not
  // "finish" round: points
  const [roundState, setRoundState] = useState("finish")

  const handleUserNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    setUserName(event.target.username.value)
    event.target.username.value = ""
  }

  const userList = [
    { name: "Deli cocuk", status: false, score: 1},
    { name: "Efendi cocuk", status: false, score: 5},
    { name: "Janti boi", status: true, score: 3},
    { name: "Serseri mayin", status: false, score: 8},
    { name: "Bam bam boi", status: true, score: 3}
  ]

  const resultList = [
    { strategy: "Most Voted", score: 3},
    { strategy: "Average", score: 2.7}
  ]

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
        <UserTable userList={userList} roundState={roundState}/>
        {roundState === "finish" ? <ResultTable resultList={resultList}/> : null }
      </div>
      <div>
        <CardsPanel/>
      </div>
    </div>
  );
}

export default App;
