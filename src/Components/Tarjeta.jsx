import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
/*
    {
          "month": "01-2021",
          "incomes": {
            "total": 90000.0,
            "items": [
              {
                "concept": "Sueldo",
                "amount": 94000
              }
            ]
          },
          "expenses": {
            "total": 20323.43,
            "items": [
              {
                "concept": "TV",
                "amount": 434.62
              },
              {
                "concept": "Remera",
                "amount": 134.64
              },
              {
                "concept": "Pantalon",
                "amount": 4334.65
              }
            ]
          }
*/

const renderList = list => {
    return (
        <ul>
            {list.map(item => {
                return (<li key={item.id}>{item.concept} {item.amount} </li>)
            })}
        </ul>
    )
}

const handleClick = () => {
    console.log('ok')
}

const Tarjeta = ({ month }) => {
  return (
    <Container
    onClick={handleClick}
    style={{ backgroundColor: "#f094", marginBottom: "16px", borderRadius: "10px" }}>
      <Row>
        <Row>
          <Link to={"/details/" + month.date} state={month} ><h1>{month.date}</h1></Link>
        </Row>
        <Row>
          <Col>
            <p>{month.incomes.total}</p>
            <p>{month.expenses.total}</p>
          </Col>
          <Col>
            <p>Balance</p>
            <p>{month.incomes.total - month.expenses.total}</p>
          </Col>
        </Row>
      </Row>
      <Row>
        <Container style={{ backgroundColor: "grey" }}>
          <Row>
            <Col>
              <h2>Incomes</h2>
              {renderList(month.incomes.items)}
            </Col>
            <Col>
              <h2>Expenses</h2>
              {renderList(month.expenses.items)}
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Tarjeta;

/*
<Container style={{backgroundColor: "#0f45"}}>
        <Row>
          <Col><h1>{data[0].year.number}</h1></Col>
          <Col>
            <Row>
              <Col>{data[0].year.incomes}</Col>
            </Row>
            <Row>
            <Col>{data[0].year.expenses}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
          <Row>
              <h1>Header</h1>
          </Row>
          <Row>
              <Col>
                <h2>Incomes</h2>
                <ul>
                    {data[0].months[0].incomes.items.map(elem => {
                        return (
                            <li key={elem.concept}>
                                {elem.concept} {elem.amount}
                            </li>
                        )
                    })}
                </ul>
              </Col>
              <Col>
              <h2>Expenses</h2>
              </Col>

          </Row>
      </Container>
*/
