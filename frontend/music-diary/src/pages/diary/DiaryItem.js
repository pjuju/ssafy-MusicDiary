import './DiaryItem.css'
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'

const DiaryItem =({...it}) => {
    const strDate = new Date(parseInt(it.date)).toLocaleDateString();
    const navigate = useNavigate();

    return (<div className="diary-item" >
        {it.bookmark !==0 ? (<>
        <Card className='diary-item-card' onClick={()=>{navigate(`/diary/${it.id}`)}}>
            <Card.Body>
                <div className='diary-item-header'>
                    <Card.Title className='diary-item-emotion'><img src={it.emotion} style={{width:'4vw'}}></img></Card.Title>
                    <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                </div>
                <Card.Text className='diary-item-content'>{strDate}</Card.Text>
                <Card.Text className='diary-item-content'>{it.content}</Card.Text>
                <Card.Text className='diary-item-content'>
                    <img src={it.image}></img></Card.Text>
            </Card.Body>
        </Card>
        </>) : (<>
        <Card className='diary-item-card'>
            <div className='bookmark-paper'></div>
                <Card.Body>
                    <div className='diary-item-header'>
                        <Card.Title className='diary-item-emotion'><img src={it.emotion} style={{width:'4vw'}}></img></Card.Title>
                        <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                    </div>
                    <Card.Text className='diary-item-content'>{strDate}</Card.Text>
                    <Card.Text className='diary-item-content'>{it.content}</Card.Text>
                    <Card.Text className='diary-item-content'>
                    <img src={it.image}></img></Card.Text>
                </Card.Body>
            </Card>
        </>)}
    </div>)
} 

export default DiaryItem