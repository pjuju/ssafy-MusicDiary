import MainNote from '../mainpages/MainNote'

import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStatecontent } from "../../App";
import { getStringDate } from "../../util/date";
import { DiaryDispatchContext } from "../../App.js";

import './DetailDiary.css'

const DetailDiary =() => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStatecontent);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const [emotion, setEmotion] = useState('');
    const [date, setDate] = useState('');
    const [bookmark, setBookmark] = useState(false)
    const [image,setImage] = useState('')

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);
    
    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
                );
                
                if (targetDiary) {
                    // 일기가 존재할 때
                    setTitle(targetDiary.title);
                    setcontent(targetDiary.content)
                    setEmotion(targetDiary.emotion)
                    setDate(targetDiary.date)
                    setBookmark(targetDiary.bookmark)
                } else {
                    // 일기가 없을 때
                    alert("없는 일기입니다.");
                    navigate("/calender", { replace: true });
                }
            }
        }, [id, diaryList]);

    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const { onRemove, onBookmark, onEdit } = useContext(DiaryDispatchContext);
    const handleRemove = () => {
        const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
            );
        if (window.confirm("정말 삭제하시겠습니까?")) {
          onRemove(targetDiary.id);
          navigate("/diarylist", { replace: true });
        }
      };

    // 북마크 True or False
    // 지금 내가 열고 있는 페이지의 일기 정보
    const targetDiary = diaryList.find(
          (it) => parseInt(it.id) === parseInt(id)
          );
          
    const bookmarkRef= useRef()

    // 이 버튼을 누르면 이 일기의 북마크가 true <-> false 왔다갔다 하게 됩니다!
    const handleBookmark =() =>{
        // setBookmark(!bookmark)
        // onEdit을 사용해서 이 일기의 전체 정보를 다시 날려줍니다
        onEdit(targetDiary.id, date, title, content, emotion,image,bookmark)

        // 여기서부터 true면 분홍색으로, false면 색이 없는 것으로
        // if (targetDiary.bookmark === false) {
        //     bookmarkRef.current.style.backgroundColor = 'pink'
        //     bookmarkRef.current.style.border = 'none'
        // }
        // if (targetDiary.bookmark === true) {
        //     bookmarkRef.current.style.backgroundColor = 'white'
        //     bookmarkRef.current.style.border = 'black 1px solid'
        // }
        
        console.log('북마크 상태',targetDiary.bookmark)
    }
    
    // 이 일기가 생성될때마다 북마크의 값을 토글처럼 바꾼다!
    useEffect(() => { 
        setBookmark(!bookmark)
        // targetDiary.bookmark = bookmark
        // onEdit(targetDiary.id, date, title, content, emotion,image,bookmark)
        if (targetDiary.bookmark === true) {
            bookmarkRef.current.style.backgroundColor = 'pink'
            bookmarkRef.current.style.border = 'none'
        }
        if (targetDiary.bookmark === false) {
            bookmarkRef.current.style.backgroundColor = 'white'
            bookmarkRef.current.style.border = 'black 1px solid'
        }
    }, [targetDiary]);

    return (<div className='detail-diary'>
        <div className='detail-diary-item'>
            <button onClick={()=>{navigate(`/diarylist`)}}>돌아가기</button>
            <p>날짜 : {strDate}</p>
            <p>감정 : <img src={emotion}></img></p>
            <p>제목 : {title}</p>
            <p>내용 : {content}</p>
            <div className='bookmark'
                ref= {bookmarkRef}
                onClick={()=>{handleBookmark()}}
            ></div>
            <button onClick={()=>{navigate(`/edit/${id}`)}}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
        </div>
        <MainNote className='main-note'></MainNote>
    </div>)
}

export default DetailDiary