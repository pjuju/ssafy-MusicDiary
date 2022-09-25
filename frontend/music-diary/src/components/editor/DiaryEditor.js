import { useContext, useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { DiaryDispatchContext } from '../../App';
import React from "react";
import { writeDiaryListApi, modifyDiaryItem } from '../../api/diaryApi';

import './DiaryEditor.css'

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

// 이모티콘 선택
const emotionList = [
    {
        emotion_id:1,
        emotion_img : '/assets/img/happy_emoji.png',
        emotion_descript:'행복'
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

    const [created_date,setCreated_date] = useState(getStringdate(new Date()))
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
        // console.log(date)

        // if (
        //     window.confirm(
        //         isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
        //     ) 
        //   ) {
              if (!isEdit) {
                  onCreate(created_date, title, content, emotion, image,bookmark);
                  const diaryInfo = {
                    title,
                    content,
                    emotion,
                    created_date
                }
        
                writeDiaryListApi(diaryInfo)
                .then((res)=>{
                    console.log('일기 생성',JSON.stringify(res.data))
                    console.log(res.data)
                })
                .catch((err)=>{
                    console.log(JSON.stringify(err.data))
                })
                } 
                
            if (isEdit) {
                    // onEdit(originData.id, date, title, content, emotion,image,bookmark);
                    const diaryInfo = {
                        title,
                        content,
                        emotion,
                        created_date
                    }
                    modifyDiaryItem(originData.id,diaryInfo)
                    .then((res)=>{
                        console.log(res.data)
                        console.log(diaryInfo)
                    })
                    .catch((err)=>{
                        console.log(JSON.stringify(err.data))
                    })
                }
            // }
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
          setCreated_date(getStringdate(new Date(originData.created_date)));
          setEmotion(originData.emotion);
          setTitle(originData.title);
          setcontent(originData.content);
        //   setBookmark(originData.bookmark);
        }
      }, [isEdit, originData]);


    return (
    <div className="diary-editor">
        <div ref={emotionRef} className='select-emotion'>
        {emotionList.map((it)=> <div onClick={emotionClick}>
            <img src={it.emotion_img} className="emoji-img" onClick={()=>handleClickEmote(it.emotion_descript)} key={it.emotion_descript}/></div>)}
        <input value={created_date}
            onChange={(e) => setCreated_date(e.target.value)}
            type="date"
            className='input-date'></input>
        </div>

        <div className='left-section'>
            <div style={{display:'flex', marginLeft:'3vw'}}>
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
        </div>
        <button onClick={handleSubmit} className="submit-button">작성 완료</button>
        <button onClick={()=>{navigate(-1)}} className="back-button">작성 취소</button>

    </div>)
}

export default DiaryEditor