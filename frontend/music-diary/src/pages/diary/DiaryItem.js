import './DiaryItem.css'
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

const DiaryItem =({...it}) => {
    const strDate = new Date(it.created_date).toLocaleDateString();
    const navigate = useNavigate();

    const rightEmotion =(emotion) => {
        if(emotion === '기쁨') {
          return '/assets/img/happy_emoji.png'
        }
        if(emotion === '슬픔') {
          return '/assets/img/sad_emoji.png'
        }
        if(emotion === '평온') {
          return '/assets/img/normal_emoji.png'
        }
        if(emotion === '우울') {
          return '/assets/img/depressed_emoji.png'
        }
        if(emotion === '분노') {
          return '/assets/img/angry_emoji.png'
        }
        if(emotion === '불안') {
          return '/assets/img/anxious_emoji.png'
        }
      }

 
    return (<div className="diary-item" >

        <Card className='diary-item-card' onClick={()=>{navigate(`/diary/${it.id}`)}}>
            <Card.Body>
                <div className='diary-item-header'>
                    <Card.Title className='diary-item-emotion'><img src={rightEmotion(it.emotion)} style={{width:'4vw'}}></img></Card.Title>
                    <Card.Title className='diary-item-title'><div className='diary-title'>{it.title}</div></Card.Title>
                </div>
                <Card.Text className='diary-item-date'>{strDate}</Card.Text>
                <Card.Text className='diary-item-content'>{it.content}</Card.Text>
                <Card.Text className='diary-item-image'>
                    <img src={it.image}></img></Card.Text>
            </Card.Body>
        </Card>

    </div>)
} 

export default DiaryItem