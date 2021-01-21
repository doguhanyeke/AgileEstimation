import {useState} from "react"
import Card from "./Card"
import Button from 'react-bootstrap/Button';
import { vote, clearVote } from '../../services/room'
import { Container, Row, Col } from "react-bootstrap";

const CardsPanel = (props) => {
    const [isClicked, setIsClicked] = useState(false)
    const userID = props.userID
    const roomID = props.roomID
    //const color = props.selected ? props.selectedColor : props.defaultColor
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const cardScores = [1,2,3,5,8,13,21];

    const voteScore = function () {
        // console.log("do http call with score" + cardScores[selectedCardIndex])
        vote(userID, cardScores[selectedCardIndex], roomID, localStorage.getItem("authToken")).then(result => {
            console.log("voted!")
            setIsClicked(true)
        }).catch(e => {
            console.log("error in vote", e.message)
        }) 
    }

    const clearScore = () => {
        console.log("userID, roomID", userID, roomID)
        clearVote(userID, roomID, localStorage.getItem('authToken')).then(result => {
            console.log("vote cleared!")
            setSelectedCardIndex(null)
            setIsClicked(false)
        }).catch(e => {
            console.log("error in clearVote", e.message)
        })
    }
    const style1 = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: '0 1 auto',
        height: 'auto',
        maxWidth: '570px',
    }
    const style2 = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: '0 1 auto',
        height: 'auto',
        maxWidth: '500px',
        alignContent: 'center',
        margin: "-10px 0 0 0",
    }
    return(
        <div style={style1}>
            <div style={style2}>
                {cardScores.map( (score, ind) => {
                        return (
                        <Card 
                        key={score}
                        number={score + ""} 
                        selected={selectedCardIndex === ind}
                        selectedColor={"lightblue"} 
                        defaultColor={"gray"}
                        cardClicked={() => {
                            setSelectedCardIndex(ind)
                        }}
                        /> 
                )})}
            </div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                    <Button onClick={clearScore} variant="danger" disabled={!isClicked}>Clear</Button>
                    </Col>
                    <Col md="auto">
                    <Button onClick={voteScore} variant="success" disabled={selectedCardIndex === null || isClicked}>Vote</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CardsPanel