import MainNote from '../mainpages/MainNote'

import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { DiaryDispatchContext } from "../../App.js";

import './DetailDiary.css'

const DetailDiary =() => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [emotion, setEmotion] = useState('');
    const [date, setDate] = useState('');
    const [bookmark, setBookmark] = useState(false)

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
                    setContext(targetDiary.context)
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
    const { onRemove } = useContext(DiaryDispatchContext);
    const handleRemove = () => {
        const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
            );
        if (window.confirm("정말 삭제하시겠습니까?")) {
          onRemove(targetDiary.id);
          navigate("/diarylist", { replace: true });
        }
      };
/////////////////////////////////////////////////////
    const targetDiary = diaryList.find(
          (it) => parseInt(it.id) === parseInt(id)
          );

    const handleBookmark =() =>{
        console.log('이 일기의 북마크',targetDiary.bookmark)
        setBookmark(!targetDiary.bookmark)
        // if (targetDiary.bookmark === false) {
            //     setBookmark(!targetDiary.bookmark)
            //     // targetDiary.bookmark = true
            // }
            // if (targetDiary.bookmark === true) {
                //     setBookmark(!targetDiary.bookmark)
                
                //     // targetDiary.bookmark = false
                // }
                console.log('이 일기의 북마크',targetDiary.bookmark)
        console.log('그냥 북마크',bookmark)
    }


        
    return (<div className='detail-diary'>
        <div className='detail-diary-item'>
            <button onClick={()=>{navigate(`/diarylist`)}}>돌아가기</button>
            <p>날짜 : {strDate}</p>
            <p>감정 : <img src={emotion}></img></p>
            <p>제목 : {title}</p>
            <p>내용 : {context}</p>
            <div style={{width:'5vw',height:'10vh',backgroundColor:'green'}}
                onClick={handleBookmark}
            ></div>
            <button onClick={()=>{navigate(`/edit/${id}`)}}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
        </div>
        <MainNote className='main-note'></MainNote>
    </div>)
}

export default DetailDiary