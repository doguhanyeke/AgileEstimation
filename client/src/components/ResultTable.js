import React from "react";
import Table from 'react-bootstrap/Table';

const ResultTable = (props) => {
    console.log(props)
    const style = {
        width: "400px"
    }
    return (
        <div style={style}>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Results</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.resultList.map((result) => {
                        return (
                            <tr>
                                <td>#</td>
                                <td>{result.strategy}</td>
                                <td>{result.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </Table>       
        </div>
    )
}

export default ResultTable;