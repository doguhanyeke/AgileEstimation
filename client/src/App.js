import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import roomService from './services/room';
import Room from './components/Room'
import { 
  Route,
  Switch,
  Link,
  useHistory
} from 'react-router-dom'

const  App = () => {
  const [username, setUserName] = useState("jj")
  const [userID, setUserID] = useState(null)
  const [roomID, setRoomID] = useState(null)
  const [token, setToken] = useState(null)
  const [userList, setUserList] = useState([])
  const [noUsernameErrorMes, setNoUsernameErrorMes] = useState(null)

  const history = useHistory();

  // round states, 3 options
  // "start" round: only names
  // "voting" round: voted or not
  // "finish" round: points
  const [roundState, setRoundState] = useState(null)

  useEffect(() => {
    const id = setInterval(() => 
      roomService.getStatus(token)
        .then(function(response) {
           console.log("asdfasdf", response.status)
           if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
           setRoundState(response.data.state)
           setUserList(response.data.users)
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        })
    , 3000)
    return () => clearInterval(id);  
  });

  const handleUserNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    setUserName(event.target.username.value)
    event.target.username.value = ""
  }

  /*const userList = [
    { name: "Deli cocuk", status: false, score: 1},
    { name: "Efendi cocuk", status: false, score: 5},
    { name: "Janti boi", status: true, score: 3},
    { name: "Serseri mayin", status: false, score: 8},
    { name: "Bam bam boi", status: true, score: 3}
  ]*/

  const resultList = [
    { strategy: "Most Voted", score: 3},
    { strategy: "Average", score: 2.7}
  ]

  const handleCreateRoomClick = () => {
    if(!username){
      setNoUsernameErrorMes("You first need to set username!")
      setTimeout(() => {
        setNoUsernameErrorMes(null)  
      }, 3000)
    } else {
      roomService
      .createRoom()
      .then(res => {
        setUserID(res.userID)
        setRoomID(res.roomID)
        setRoundState("start")
        setToken(res.token)
      }).catch(error => {
        console.log("Error in handleCreateRoomClick")
      })
    }
  }

  const handleEnterRoomIDClick = (e) => {
    e.preventDefault()
    if(!username){
      setNoUsernameErrorMes("You first need to set username!")
      setTimeout(() => {
        setNoUsernameErrorMes(null)  
      }, 3000)
    } else {
      console.log(e.target.roomID.value)
      history.push(`/room/${e.target.roomID.value}`)
      // history.push(`/room/${e.target.roomID.value}`)
    }
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
        <p>
          Username: {username}
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
        <Route path="/room/:id">
          <Room 
            roundState={roundState}
            setRoundState={setRoundState}
            userList={userList}
            resultList={resultList}
            username={username}
          />
          
        </Route>
        <Route path="/">
          <h2>
            { roomID 
            ? <Link to={`/room/${roomID}`}>Room Link</Link>
            : null
            }
          </h2>
          {!roomID ?
            <h2>
              <div>
                {!roomID ? <Button onClick={() => handleCreateRoomClick()} variant="primary">Create a room</Button> : null}
              </div>
              <p>
                or
              </p>
              <form onSubmit={handleEnterRoomIDClick}>
                <input placeholder="Enter room ID" name="roomID"></input>
                <Button type="submit">Enter</Button>
              </form>
              <p>
                {noUsernameErrorMes}
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
