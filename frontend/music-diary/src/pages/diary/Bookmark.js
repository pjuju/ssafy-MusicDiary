import './Bookmark.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Bookmark =({...it}) => {
    return (
    <div className="bookmark" >
        <div className='real-bookmark'></div>
        <Card className='bookmark-item'>
            <Card.Body>
                <div className='bookmark-item-header'>
                    <Card.Title className='bookmark-emotion'>
                        <img src='/assets/img/emoji.png' className='bookmark-emotion'/>
                    </Card.Title>
                    <Card.Title className='bookmark-title'>{it.title}</Card.Title>
                </div>
                <p className='bookmark-created-date'>생성날짜</p>
                <Card.Text>
                    
                {it.img === 0? (<div className="bookmark-context">{it.context}</div>) 
                : (<div style={{position:'relative'}}><div className="bookmark-img-context col-10">{it.context}</div><img src="/assets/img/jeju.jpg" className='bookmark-img col-2'/></div>)}  
                </Card.Text>

            </Card.Body>
        </Card>
    </div>)
}

export default Bookmark