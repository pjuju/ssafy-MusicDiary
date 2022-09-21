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
    const [emotion, setEmotion] = useState(0);
    const [date, setDate] = useState('');

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

      console.log(diaryList)
        
    return (<div className='detail-diary'>
        <div className='detail-diary-item'>
            <button onClick={()=>{navigate(`/diarylist`)}}>돌아가기</button>
            <p>날짜 : {strDate}</p>
            <p>감정 : {emotion}</p>
            <p>제목 : {title}</p>
            <p>내용 : {context}</p>
            <button onClick={()=>{navigate(`/edit/${id}`)}}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
        </div>
        <MainNote className='main-note'></MainNote>
    </div>)
}

export default DetailDiary