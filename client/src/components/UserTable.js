import React from "react";
import Table from 'react-bootstrap/Table';

const UserTable = (props) => {

    const renderSwitch = (user) => {
        switch(props.roundState) {
            case "start":
                return <td></td>
            case "voting":
                const vote = props.voteList.find(vote => vote.user.id === user.id)
                return <td>{vote ? "Voted!" : "-"}</td>
            case "finish":
                return <td>{user.status ? user.score : "-"}</td>
            default:
                return <td></td>
        }
    }

    const style = {
        width: "400px"
    }
    return (
        <div style={style}>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Users</th>
                    {props.roundState === "start" ? null : <th>Status</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.userList && props.userList.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                {renderSwitch(user)}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>       
        </div>
    )
}

export default UserTable;