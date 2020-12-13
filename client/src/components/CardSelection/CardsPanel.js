import {useState} from "react"
import Card from "./Card"

const CardsPanel = (props) => {
    //const color = props.selected ? props.selectedColor : props.defaultColor
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const cardScores = [1,2,3,5,8,13,21];

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: '0 1 auto',
            height: 'auto',
            maxWidth: '500px',
            alignContent: 'center'
          }}>
              {cardScores.map( (score, ind) => {
                    return <Card 
                            key={score}
                            number={score + ""} 
                            selected={selectedCardIndex === ind}
                            selectedColor={"red"} 
                            defaultColor={"gray"}
                            cardClicked={() => {
                                setSelectedCardIndex(ind)
                            }}
                            />    
              } )}
        </div>
    )
}

export default CardsPanel