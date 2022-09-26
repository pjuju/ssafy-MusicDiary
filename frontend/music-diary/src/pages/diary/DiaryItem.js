import './DiaryItem.css'
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom'

const DiaryItem =({...it}) => {
    const strDate = new Date(it.created_date).toLocaleDateString();
    const navigate = useNavigate();

    const rightEmotion =(emotion) => {
        if(emotion === '행복') {
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
        if(emotion === '화남') {
          return '/assets/img/angry_emoji.png'
        }
        if(emotion === '놀람') {
          return '/assets/img/anxious_emoji.png'
        }
      }

    return (<div className="diary-item" >
        {it.bookmark !==0 ? (<>
        <Card className='diary-item-card' onClick={()=>{navigate(`/diary/${it.id}`)}}>
            <Card.Body>
                <div className='diary-item-header'>
                    <Card.Title className='diary-item-emotion'><img src={rightEmotion(it.emotion)} style={{width:'4vw'}}></img></Card.Title>
                    <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                </div>
                <Card.Text className='diary-item-date'>{strDate}</Card.Text>
                <Card.Text className='diary-item-content'>{it.content}</Card.Text>
                <Card.Text className='diary-item-image'>
                    <img src={it.image}></img></Card.Text>
            </Card.Body>
        </Card>
        </>) : (<> 
        <Card className='diary-item-card'>
            <div className='bookmark-paper'></div>
                <Card.Body>
                    <div className='diary-item-header'>
                        <Card.Title className='diary-item-emotion'><img src={rightEmotion(it.emotion)} style={{width:'4vw'}}></img></Card.Title>
                        <Card.Title className='diary-item-title'>{it.title}</Card.Title>
                    </div>
                    <Card.Text className='diary-item-date'>{strDate}</Card.Text>
                    <Card.Text className='diary-item-content'>{it.content}</Card.Text>
                    <Card.Text className='diary-item-image'>
                    <img src={it.image}></img></Card.Text>
                </Card.Body>
            </Card>
        </>)}
    </div>)
} 

export default DiaryItem