import { useContext, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { DiaryDispatchContext } from '../../App';
import React from "react";

import './DiaryEditor.css'

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

// 이모티콘 선택
const emotionList = [
    {
        emotion_id:1,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'기쁨'
    },
    {
        emotion_id:2,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'슬픔'
    },
    {
        emotion_id:3,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'평온'
    },
    {
        emotion_id:4,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'기쁨'
    },
    {
        emotion_id:5,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'슬픔'
    },
    {
        emotion_id:6,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/emoji.png',
        emotion_descript:'평온'
    },
]

// 오늘 날짜 그대로 출력하기
const getStringDate = (date) => {
    return date.toISOString().slice(0,10)
}

const DiaryEditor =({ isEdit, originData }) => {

    const navigate = useNavigate();

    const [date,setDate] = useState(getStringDate(new Date()))
    const [context, setContext] = useState('')
    const [title, setTitle] = useState('')
    const [emotion, setEmotion] = useState(1)
    const [image, setImage] = useState()
    const contextRef = useRef()
    const titleRef = useRef()

    const handleClickEmote = (emotion) => {
        console.log("emotion:", emotion)
        setEmotion(emotion)
    }

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

    const handleSubmit = () => {
        if(context.length < 1) {
            contextRef.current.focus();
            return
        }
        if(title.length < 1) {
            titleRef.current.focus();
            return
        }
        if (
            window.confirm(
              isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
            )
          ) {
            if (!isEdit) {
              onCreate(date, title, context, emotion);
            } else {
              onEdit(originData.id, date, title, context, emotion);
            }
          }
        navigate('/diarylist',{replace:true})
    }


    const [imageUrl, setImageUrl] = useState(null);
    const imgRef = useRef();
  
    const onChangeImage = () => {
      const reader = new FileReader();
      const file = imgRef.current.files[0];
      console.log(file);
  
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        // console.log("이미지주소", reader.result);
      };

      setImage(reader.result)
      console.log(image)
      let anser = reader.result
      console.log(typeof anser)
    };
  
    const onClickFileBtn = (e) => {
      imgRef.current.click();
    };


    return (
    <div className="diary-editor">
        <button onClick={()=>{navigate(-1)}}>뒤로 가기</button>
        <div className='select-emotion'>
            <h4>감정 선택하기</h4>
            {emotionList.map((it)=> <div >
                <img src={it.emotion_img} className="emoji-img" onClick={()=>handleClickEmote(it.emotion_id)} key={it.emotion_id}/></div>)}
        </div>

        <div className='left-section'>
            <div style={{display:'flex', marginLeft:'3vw'}}>
                <h2>날짜</h2>
                <input value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className='input-date'></input>
            </div>
            <textarea className='diary-textarea-title' placeholder='제목을 입력하세요'
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <textarea className='diary-textarea-context' placeholder='내용을 입력하세요'
                ref={contextRef}
                value={context}
                onChange={(e) => setContext(e.target.value)}
            ></textarea>
        </div>
        <div className='right-section'>
        <React.Fragment>
            <img src={imageUrl ? imageUrl : "http://skg1891.cafe24.com/wp-content/uploads/2013/11/dummy-image-square.jpg"} style={{width:'20vw'}}></img>
            <input
                type="file"
                ref={imgRef}
                onChange={onChangeImage}
                style={{ display: "none" }}
                value={image}
            ></input>
            <button
                onClick={() => {
                onClickFileBtn();
                }}
            >
                이미지 업로드
            </button>
            </React.Fragment>
            <button onClick={handleSubmit}>작성 완료</button>
        </div>

    </div>)
}

export default DiaryEditor