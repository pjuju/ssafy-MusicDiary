import './DiaryItem.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const DiaryItem =({...it}) => {
    return (<div className="diary-item" >
        {/* <div className='diary-item-header'>
            <div className='col-2'>{it.emotion}</div>
            <div className='col-9'>{it.title}</div>
        </div>
        <div className='diary-item-context'>{it.context}</div> */}


        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <div className='diary-item-header'>
                    <Card.Title className='col-2'>{it.emotion}</Card.Title>
                    <Card.Title className='col-9'>{it.title}</Card.Title>
                </div>
                <Card.Text>{it.context}</Card.Text>
            </Card.Body>
        </Card>
    </div>)
}

export default DiaryItem