import './App.css';
import {
  Button,
  Form,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import roomService from './services/room';
import Room from './components/Room'
import { 
  Route,
  Switch,
  Link,
  useHistory,
} from 'react-router-dom'

const  App = () => {
  const [isAdmin, setIsAdmin] = useState(false || localStorage.getItem("isAdmin"))
  const [username, setUserName] = useState(null || localStorage.getItem("userName"))
  const [userID, setUserID] = useState(null)
  const [roomID, setRoomID] = useState(null || localStorage.getItem("roomID"))
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

  const handleCreateRoomClick = () => {
    roomService
    .createRoom()
    .then(res => {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", true)
      setUserID(res.userID)
      console.log("melodi", res.roomID)
      setRoomID(res.roomID)
      localStorage.setItem("roomID", res.roomID)
      setUserName(res.username)
      localStorage.setItem("userName", res.username)
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
    <div className="text-center" >
      <h1 className="font-weight-bold">
        Agile Estimator
      </h1>
      
      <Switch>
        <Route path="/room/:id">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <h2>
                  { roomID 
                  ? <Link to={`/room/${roomID}`}>Room Link</Link>
                  : null
                  }
                </h2>
              </Col>
            </Row>
          </Container>
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
          <Container>
            <Row>
              <Col>
                {!roomID ?
                  <h2>
                    <div>
                      {!roomID ? <Button onClick={() => handleCreateRoomClick()} variant="primary">Create a room</Button> : null}
                    </div>
                    <p>
                    <p>
                    </p>
                    </p>
                    <Form onSubmit={handleEnterRoomIDClick}>
                      <input placeholder="Enter room ID" name="roomID"></input>
                      <Button variant="primary" size='lg'>Enter</Button>
                    </Form>
                  </h2>
                  : null
                }
              </Col>
            </Row>
          </Container>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
