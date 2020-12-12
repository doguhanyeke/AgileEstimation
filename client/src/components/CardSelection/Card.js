const Card = (props) => {
    const color = props.selected ? props.selectedColor : props.defaultColor
    const style = {backgroundColor:color, width: "100px", height: "150px"};
    return(
        <div style={style}>
            <button onClick={props.cardClicked}>
            {props.number}
            </button>
        </div>
    )
}

export default Card