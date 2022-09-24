import { useContext, useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { DiaryDispatchContext } from '../../App';
import React from "react";
import { writeDiaryListApi } from '../../api/diaryApi';

import './DiaryEditor.css'

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

// 이모티콘 선택
const emotionList = [
    {
        emotion_id:1,
        emotion_img : '/assets/img/happy_emoji.png',
        emotion_descript:'기쁨'
    },
    {
        emotion_id:2,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/sad_emoji.png',
        emotion_descript:'슬픔'
    },
    {
        emotion_id:3,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/normal_emoji.png',
        emotion_descript:'평온'
    },
    {
        emotion_id:4,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/depressed_emoji.png',
        emotion_descript:'우울'
    },
    {
        emotion_id:5,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/angry_emoji.png',
        emotion_descript:'화남'
    },
    {
        emotion_id:6,
        emotion_img : process.env.PUBLIC_URL + '/assets/img/anxious_emoji.png',
        emotion_descript:'놀람'
    },
]

// 오늘 날짜 그대로 출력하기
const getStringdate = (date) => {
    return date.toISOString().slice(0,10)
}

const DiaryEditor = ({ isEdit, originData }) => {

    const navigate = useNavigate();
    // const image_url= process.env.PUBLIC_URL + ''

    const [date,setDate] = useState(getStringdate(new Date()))
    const [content, setcontent] = useState('')
    const [title, setTitle] = useState('')
    const [emotion, setEmotion] = useState('')
    const [image, setImage] = useState("")
    const contentRef = useRef()
    const titleRef = useRef()
    const emotionRef = useRef()
    const [emotionIsClick,setEmotionIsClick] = useState(false)
    const [bookmark, setBookmark] = useState(false)

    const emotionClick = () => {
        setEmotionIsClick(!emotionIsClick)
    }

    const handleClickEmote = (emotion) => {
        setEmotion(emotion)
    }  

    const { onCreate, onEdit } = useContext(DiaryDispatchContext);

    const handleSubmit = () => {
        const diaryInfo = {
            title,
            content,
            emotion:"aaa"
            
        }
        console.log(diaryInfo)

        writeDiaryListApi(diaryInfo)
        .then((res)=>{
            console.log(JSON.stringify(res.data))
        })
        .catch((err)=>{
            console.log(JSON.stringify(err.data))
        })

        if(content.length < 1) {
            contentRef.current.focus();
            return
        }
        if(title.length < 1) {
            titleRef.current.focus();
            return
        }
        if(!emotionIsClick) {
            emotionRef.current.focus();
            return
        }

        if (
            window.confirm(
                isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
            ) 
          ) {
              if (!isEdit) {
                  onCreate(date, title, content, emotion, image,bookmark);
                } else {
                    onEdit(originData.id, date, title, content, emotion,image,bookmark);

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

    };
  
    const onClickFileBtn = (e) => {
      imgRef.current.click();
    };

    // 원래 일기 정보 보여주는 로직
    useEffect(() => {
        if (isEdit) {
          setDate(getStringdate(new Date(parseInt(originData.date))));
          setEmotion(originData.emotion);
          setTitle(originData.title);
          setcontent(originData.content);
          setBookmark(originData.bookmark);
        }
      }, [isEdit, originData]);


    return (
    <div className="diary-editor">
        <button onClick={()=>{navigate(-1)}}>뒤로 가기</button>
        <div className='select-emotion'>
            <h4>감정 선택하기</h4>
            <div style={{width:'30vw',height:'6vh'}} ref={emotionRef} onClick={emotionClick}>
            {emotionList.map((it)=> <div>
                <img src={it.emotion_img} className="emoji-img" onClick={()=>handleClickEmote(it.emotion_img)} key={it.emotion_img}/></div>)}
            </div>
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
            <textarea className='diary-textarea-content' placeholder='내용을 입력하세요'
                ref={contentRef}
                value={content}
                onChange={(e) => setcontent(e.target.value)}
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
                }}>
                이미지 업로드
            </button>
            </React.Fragment>
            <button onClick={handleSubmit}>작성 완료</button>
        </div>

    </div>)
}

export default DiaryEditor