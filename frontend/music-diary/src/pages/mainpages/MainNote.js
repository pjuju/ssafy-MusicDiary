import './MainNote.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const MainNote = () => {
    return(<div className='main-note'>
        <div className='left-page'>
            <div className='profile'>
                <img src='/assets/main/human.png' className='profile-image'></img>
                <p>회쏘경수</p>
            </div>
            <div className='profile-menu'>
                <h2>일기장</h2>
                <h2>책갈피</h2>
                <h2>My playlist</h2>
                <h2>음악 추천</h2>
            </div>
        </div>
        <div className='bookmarks'>
            <div className='logout'>로그아웃</div>
            <div className='my-page'>마이 페이지</div>



        </div>
        <img src="/assets/main/book3.png" className='book-background'/>
    </div>)
}

export default MainNote