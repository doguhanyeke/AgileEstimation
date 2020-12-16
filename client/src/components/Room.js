import React from "react";
import CardsPanel from './CardSelection/CardsPanel';
import UserTable from './UserTable';
import ResultTable from './ResultTable';
import Button from 'react-bootstrap/Button';

const Room = (props) => {
    const roundState = props.roundState
    const userList = props.userList
    console.log(props.userList)
    const resultList = props.resultList
    const roomAdmin = ""
    const username = props.username
    const setRoundState = props.setRoundState

    return (
        <div>
            <div>
                {roundState && <UserTable userList={props.userList} roundState={roundState}/>}
                {roundState === "finish" ? <ResultTable resultList={resultList}/> : null }
            </div>
            <div>
                {roundState==="voting" ? <CardsPanel/> : null}
            </div>
            <div>
                {roundState === "start" && roomAdmin === username 
                ? <Button variant="primary">Start Round</Button> 
                : null}
                {roundState === "voting" && roomAdmin === username 
                ? <Button variant="success">Finish Round</Button> 
                : null}
            </div>
        </div>
    )
}

export default Room