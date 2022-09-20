import './MainNote.css'
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const MainNote = () => {
    const navigate = useNavigate();
    return(<div className='main-note'>
        <div className='left-page'>
            {/* <div className='profile'>
                <img src='/assets/main/human.png' className='profile-image'></img>
                <p>회쏘경수</p>
            </div> */}
            {/* <figure class="snip1082 profile"><img src="https://images.chosun.com/resizer/isdog_htxCDUvvjr_QFnRf9sOrs=/530x669/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/CSJLDK7W7ACCYCSNQTO5BU63OU.jpg" alt="sample2"/>
                <h3>회쏘경수</h3>
                <div>오늘도 좋은 하루 보내세요!</div>
            </figure> */}
            <figure class="snip1500 profile">
                <img src="https://images.chosun.com/resizer/isdog_htxCDUvvjr_QFnRf9sOrs=/530x669/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/CSJLDK7W7ACCYCSNQTO5BU63OU.jpg" alt="sq-sample14" />
                <figcaption>
                    <div>
                    <h2>회쏘경수</h2>
                    </div>
                </figcaption>
                <a href="#"></a>
                </figure>

            <div className='profile-menu' >
                <ul class="snip1250" onClick={()=>{navigate('/calender')}}>
                    <li><a href="#" data-hover="일기장">일기장</a></li>
                </ul>
                <ul class="snip1250" onClick={()=>{navigate('/bookmarks')}}>
                    <li ><a href="#" data-hover="책갈피">책갈피</a></li>
                </ul>
                <ul class="snip1250">
                    <li><a href="#" data-hover="My playlist">My playlist</a></li>
                </ul>
                <ul class="snip1250">
                    <li><a href="#" data-hover="음악 추천">음악 추천</a></li>
                </ul>
            </div>
        </div>
        <div className='bookmarks'>
            <div className='logout'>로그아웃</div>
            <Dropdown className='my-page'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    마이 페이지
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">회원정보 수정</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{navigate('/analysis')}}>나의 감정 분석</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">나의 스티커</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
        <img src="/assets/img/book4.png" className='book-background'/>
    </div>)
}

export default MainNote