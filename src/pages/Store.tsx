import storeData from '../data/items.json'
import { Row, Col } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'

export function Store () {
    return (
        <>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className='g-3'>
            {storeData.map(t => (
                <Col key={t.id}>
                    <StoreItem {...t}/>
                </Col>
            ))}
        </Row>
        </>
    )
}