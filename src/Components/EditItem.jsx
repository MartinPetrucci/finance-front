const EditItem = ({show}) => {
    const style = {
        position: "absolute",
        backgroundColor: "white",
        width: "70vw",
        height: "200px",
        left: "15vw",
        top: "20vw",
        display: show ? "flex" : "none"
    }
    
    return (
        <>
        <div style={style}>
            <h1>Hola</h1>
        </div>
        </>
    )
}

export default EditItem