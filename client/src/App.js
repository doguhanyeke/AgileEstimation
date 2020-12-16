import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import roomService from './services/room';
import Room from './components/Room'
import { 
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Switch,
  Link,
} from 'react-router-dom'

function App() {
  const [username, setUserName] = useState("Deli cocuk")
  const [userID, setUserID] = useState(null)
  const [roomID, setRoomID] = useState(null)

  // round states, 3 options
  // "start" round: only names
  // "voting" round: voted or not
  // "finish" round: points
  const [roundState, setRoundState] = useState(null)

  const roomAdmin = "Deli cocuk"

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

  const handleCreateRoomClick = () => {
    roomService
    .createRoom()
    .then(res => {
      setUserID(res.userID)
      setRoomID(res.roomID)
      setRoundState("start")
    }).catch(error => {
      console.log("Error in handleCreateRoomClick")
    })
  }

  return (
    <div className="text-center">
      <h1 className="font-weight-bold">
        Welcome to Agile Estimator
      </h1>

      <div>        
        <p>
          Scrum Room Id: {roomID}
        </p>
        <p>
          User Id: {userID}
        </p>
        <div>
          <form onSubmit={handleUserNameChange}>
          Username:
          <input name="username" placeholder={username}></input>
          <button type="submit">Change username</button>
          </form>
        </div>
      </div>
      

      <Switch>
        <Route path="/room">
          <Room 
            roundState={roundState}
            setRoundState={setRoundState}
            userList={userList}
            resultList={resultList}
            roomAdmin={roomAdmin}
            username={username}
          />
          
        </Route>
        <Route path="/">
          <h2>
            { roomID 
            ? <Link to="/room">Room Link</Link>
            : null
            }
          </h2>
          {!roomID ?
            <h2>
              <div>
                {!roomID ? <Button onClick={() => {console.log(handleCreateRoomClick())}} variant="primary">Create a room</Button> : null}
              </div>
              <p>
                or
              </p>
              <p>
                <input placeholder="Enter room ID"></input>
                <Button variant="success">Enter</Button>
              </p>
            </h2>
            : null
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
