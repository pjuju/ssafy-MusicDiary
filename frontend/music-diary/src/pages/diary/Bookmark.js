import './Bookmark.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const Bookmark =({...it}) => {

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
 
    const strDate = new Date(it.created_date).toLocaleDateString();
    const navigate = useNavigate();
    return (
    <div className="bookmark"  >
        <div className='real-bookmark'></div>
        <Card className='bookmark-item' onClick={()=>{navigate(`/diary/${it.id}`)}}>
            <Card.Body>
                <div className='bookmark-item-header'>
                    <Card.Title className='bookmark-title'>{it.title}</Card.Title>
                <p className='bookmark-date'>{strDate}</p>
                </div>
                <Card.Text>
                  <Card.Title className='bookmark-emotion'>
                          <img src={rightEmotion(it.emotion)} className='bookmark-emotion'/>
                      </Card.Title>
                    
                {it.img === 0? 
                (<div style={{position:'relative'}}><div className="bookmark-img-content col-10">{it.content}</div><img src="/assets/img/jeju.jpg" className='bookmark-img col-2'/></div>)
                : (<div className="bookmark-content">{it.content}</div>) }  
                </Card.Text>

            </Card.Body>
        </Card>
    </div>) 
}

export default Bookmark