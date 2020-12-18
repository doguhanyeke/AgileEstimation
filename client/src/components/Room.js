import React, { useState } from "react";
import CardsPanel from './CardSelection/CardsPanel';
import UserTable from './UserTable';
import ResultTable from './ResultTable';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { addUser, changeUserName } from "../services/user"
import { changeRoomState } from '../services/room'

const Room = (props) => {
    const isAdmin = props.isAdmin
    const roundState = props.roundState
    const userList = props.userList
    console.log(props.userList)
    const resultList = props.resultList
    const roomAdmin = ""
    const username = props.username
    const setRoundState = props.setRoundState
    const setUserName = props.setUserName

    // console.log("here", roundState)

    const { id } = useParams()

    if(!localStorage.getItem("authToken")){
        // console.log("auth token yok")
        // console.log("ridddd", id)
        addUser(id).then(result => {
            // console.log("her", result)
            if(result.status === 200){
                console.log(result.data)
                localStorage.setItem("authToken", result.data.token)
                setUserName(result.data.username)
            } else{
                console.log("not 200")
            }
        }).catch(e => console.log("hata", e.message))
    }
    
    const handleUserNameChange = (event) => {
        event.preventDefault()
        changeUserName(event.target.username.value, localStorage.getItem("authToken"))
        .then(res => {
            console.log("here", res)
            setUserName(event.target.username.value)
        })
        .catch(e => console.log("ereh", e.message))
    }

    return (
        <div>
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
            <div>
                {roundState && <UserTable userList={props.userList} roundState={roundState}/>}
                {roundState === "finish" ? <ResultTable resultList={resultList}/> : null }
            </div>
            <div>
                {roundState==="voting" ? <CardsPanel/> : null}
            </div>
            <div>
                {roundState === "start" && isAdmin 
                ? <Button variant="primary" onClick={() => {
                    setRoundState("voting")
                    changeRoomState("voting", id, localStorage.getItem("authToken") ).then(res => setRoundState("voting")).catch(e => console.log(e.message))
                }
                }>Start Round</Button> 
                : null}
                {roundState === "voting" && isAdmin 
                ? <Button variant="success" onClick={() => {
                    setRoundState("finish")
                    changeRoomState("finish", id, localStorage.getItem("authToken") ).then(res => setRoundState("finish")).catch(e => console.log(e.message))
                }}>Finish Round</Button> 
                : null}
            </div>
        </div>
    )
}

export default Room