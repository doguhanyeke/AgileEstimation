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
  useHistory,
  useParams
} from 'react-router-dom'

const  App = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUserName] = useState(null)
  const [userID, setUserID] = useState(null)
  const [roomID, setRoomID] = useState(null)
  const [userList, setUserList] = useState([])
  const [voteList, setVoteList] = useState([])
  const [resultList, setResultList] = useState([])

  const history = useHistory();

  // round states, 3 options
  // "start" round: only names
  // "voting" round: voted or not
  // "finish" round: points
  const [roundState, setRoundState] = useState(null)

  useEffect(() => {
    const id = setInterval(() => 
      roomService.getStatus(localStorage.getItem("authToken"))
        .then(function(response) {
          //  console.log("asdfasdf", response.status)
           if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
           setRoundState(response.data.status)
           setUserList(response.data.users)
           setVoteList(response.data.votes || [])
           console.log(response.data.results)
           setResultList(response.data.results ? response.data.results : [])
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
        })
    , 1000)
    return () => clearInterval(id);  
  }, []);

  /*const userList = [
    { name: "Deli cocuk", status: false, score: 1},
    { name: "Efendi cocuk", status: false, score: 5},
    { name: "Janti boi", status: true, score: 3},
    { name: "Serseri mayin", status: false, score: 8},
    { name: "Bam bam boi", status: true, score: 3}
  ]*/

  /*const resultList = [
    { strategy: "Most Voted", score: 3},
    { strategy: "Average", score: 2.7}
  ]*/

  const handleCreateRoomClick = () => {
    roomService
    .createRoom()
    .then(res => {
      setIsAdmin(true)
      setUserID(res.userID)
      setRoomID(res.roomID)
      setUserName(res.username)
      setRoundState("start")
      console.log(res.token)
      localStorage.setItem("authToken", res.token)
      history.push(`/room/${res.roomID}`)  
    }).catch(error => {
      console.log("Error in handleCreateRoomClick")
    })
  }

  const handleEnterRoomIDClick = (e) => {
    e.preventDefault()
    console.log(e.target.roomID.value)
    history.push(`/room/${e.target.roomID.value}`)
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
      </div>
      

      <Switch>
        <Route path="/room/:id">
          <Room 
            roundState={roundState}
            setRoundState={setRoundState}
            userList={userList}
            voteList={voteList}
            resultList={resultList}
            username={username}
            setUserName={setUserName}
            isAdmin={isAdmin}
            userID={userID}
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
            </h2>
            : null
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
