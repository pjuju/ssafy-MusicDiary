import './Bookmark.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const Bookmark =({...it}) => {
    const strDate = new Date(parseInt(it.date)).toLocaleDateString();
    const navigate = useNavigate();
    return (
    <div className="bookmark"  onClick={()=>{navigate(`/diary/${it.id}`)}}>
        <div className='real-bookmark'></div>
        <Card className='bookmark-item'>
            <Card.Body>
                <div className='bookmark-item-header'>
                    <Card.Title className='bookmark-emotion'>
                        <img src={it.emotion} className='bookmark-emotion'/>
                    </Card.Title>
                    <Card.Title className='bookmark-title'>{it.title}</Card.Title>
                </div>
                <p className='bookmark-date'>{strDate}</p>
                <Card.Text>
                    
                {it.img === 0? 
                (<div style={{position:'relative'}}><div className="bookmark-img-content col-10">{it.content}</div><img src="/assets/img/jeju.jpg" className='bookmark-img col-2'/></div>)
                : (<div className="bookmark-content">{it.content}</div>) }  
                </Card.Text>

            </Card.Body>
        </Card>
    </div>)
}

export default Bookmark