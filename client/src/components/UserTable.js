import React from "react";
import Table from 'react-bootstrap/Table';

const UserTable = (props) => {
    console.log(props)

    const renderSwitch = (user) => {
        switch(props.roundState) {
            case "start":
                return null
            case "voting":
                return <td>{user.status ? "Voted!" : "-"}</td>
            case "finish":
                return <td>{user.status ? user.score : "-"}</td>
            default:
                return null
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
                    <th>Name</th>
                    {props.roundState === "start" ? null : <th>Status</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.userList.map((user, index) => {
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