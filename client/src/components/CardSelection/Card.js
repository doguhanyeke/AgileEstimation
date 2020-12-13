const Card = (props) => {
    const color = props.selected ? props.selectedColor : props.defaultColor
    const style = {backgroundColor:color, width: "100px", height: "150px", lineHeight: "150px",
    cursor: "default", fontSize: "x-large",
    boxShadow: "0 0 5px rgba(0,0,0,.05), 2px 2px 5px rgba(0,0,0,.1)",
    borderRadius: "10px", marginRight: "20px", marginTop: "10px"
    };
    return(
        <div style={style} onClick={props.cardClicked}>
            {props.number}
        </div>
    )
}

export default Card