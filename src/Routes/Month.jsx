import { useParams, useLocation } from "react-router-dom"


const Month = () => {
    const location = useLocation()
    console.log('aver->',location.state)
    const params = useParams()
    return (
        <h1>{params.month}</h1>
    )
}

export default Month