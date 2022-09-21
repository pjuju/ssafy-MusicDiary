import './DiaryItem.css'
import Card from 'react-bootstrap/Card';

const DiaryItem =({...it}) => {
    const strDate = new Date(parseInt(it.date)).toLocaleDateString();

    return (<div className="diary-item" >
        {it.bookmark !==0 ? (<>
        <Card className='diary-item-card'>
            <Card.Body>
                <div className='diary-item-header'>
                    <Card.Title className='diary-item-emotion'>{it.emotion}</Card.Title>
                    <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                </div>
                <Card.Text className='diary-item-context'>{strDate}</Card.Text>
                <Card.Text className='diary-item-context'>{it.context}</Card.Text>
                <Card.Text className='diary-item-context'>
                    <img src={it.image}></img></Card.Text>
            </Card.Body>
        </Card>
        </>) : (<>
        <Card className='diary-item-card'>
            <div className='bookmark-paper'></div>
                <Card.Body>
                    <div className='diary-item-header'>
                        <Card.Title className='diary-item-emotion'>{it.emotion}</Card.Title>
                        <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                    </div>
                    <Card.Text className='diary-item-context'>{strDate}</Card.Text>
                    <Card.Text className='diary-item-context'>{it.context}</Card.Text>
                    <Card.Text className='diary-item-context'>
                    <img src={it.image}></img></Card.Text>
                </Card.Body>
            </Card>
        </>)}
    </div>)
} 

export default DiaryItem