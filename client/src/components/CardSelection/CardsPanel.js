import {useState} from "react"
import Card from "./Card"
import Button from 'react-bootstrap/Button';
import { vote } from '../../services/room'

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
        setSelectedCardIndex(null)
        setIsClicked(false)
        // TODO: Send /clearVote req to backend
    }

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: '0 1 auto',
            height: 'auto',
            maxWidth: '570px',
          }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: '0 1 auto',
                height: 'auto',
                maxWidth: '500px',
                alignContent: 'center',
                margin: "-10px 0 0 0",
            }}>
                {cardScores.map( (score, ind) => {
                        return <Card 
                                key={score}
                                number={score + ""} 
                                selected={selectedCardIndex === ind}
                                selectedColor={"lightblue"} 
                                defaultColor={"gray"}
                                cardClicked={() => {
                                    setSelectedCardIndex(ind)
                                }}
                                />    
                })}
            </div>
            <div style={{maxHeight: "40px", alignSelf:"flex-end"}}>
                <Button onClick={voteScore} variant="success" disabled={selectedCardIndex === null || isClicked}>Vote</Button>
            </div>
            <div style={{maxHeight: "40px", alignSelf:"flex-end"}}>
                <Button onClick={clearScore} variant="success" disabled={!isClicked}>Clear</Button>
            </div>
        </div>
    )
}

export default CardsPanel