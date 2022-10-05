import { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  writeDiaryListApi,
  modifyDiaryItem,
  getDiaryImage,
  makePlaylist,
  getDiaryListApi
} from "../../api/diaryApi";
import Button from "../Common/Button";

import "./DiaryEditor.css";
import axios from "axios";
import Swal from "sweetalert2";
import 'animate.css';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// 이모티콘 선택
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: "/assets/img/happy_emoji.png",
    emotion_descript: "기쁨",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/img/sad_emoji.png",
    emotion_descript: "슬픔",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/img/normal_emoji.png",
    emotion_descript: "평온",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/img/depressed_emoji.png",
    emotion_descript: "우울",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/img/angry_emoji.png",
    emotion_descript: "분노",
  },
  {
    emotion_id: 6,
    emotion_img: process.env.PUBLIC_URL + "/assets/img/anxious_emoji.png",
    emotion_descript: "불안",
  },
];

// 오늘 날짜 그대로 출력하기
const getStringdate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  // const image_url= process.env.PUBLIC_URL + ''

  const [created_date, setCreated_date] = useState(getStringdate(new Date()));
  const [content, setcontent] = useState("");
  const [title, setTitle] = useState("");
  const [emotion, setEmotion] = useState("");

  // 이미지
  const [returnImg, setReturnImg] = useState("");
  const [imgBase64, setImgBase64] = useState([]); // 미리보기를 구현할 state
  const [imgFile, setImgFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    `${process.env.PUBLIC_URL}/assets/img/default-img.png`
  );

  const contentRef = useRef();
  const titleRef = useRef();
  const emotionRef = useRef();

  // 이미지 파일을 업로드하면, 실행될 함수
  const onHandleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);

    // 미리보기 state
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 파일을 읽어서 버퍼에 저장중

        // 파일 상태업데이트
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            // 변환해서 미리보기 이미지에 넣어주는 부분
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // 이미지 업로드 버튼 함수
  const onImgRegisterBtn = () => {
    const fd = new FormData();
    // imgFile의 파일들을 읽어와서, file이라는 이름으로 저장하기
    // -> FormData에 file이라는 이름의 파일 배열이 들어감
    Object.values(imgFile).forEach((file) => fd.append("image", file));

    console.log("보낼 fd: " + Object(fd));

    getDiaryImage(fd)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setReturnImg(res.data)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  };

  const handleClickEmote = (emotion) => {
    console.log(emotion);
    setEmotion(emotion);
  };
  
  // 전체 일기 리스트 불러오기
  const [total, setTotal] = useState([])
  useEffect(()=> {
    getDiaryListApi()
    .then((res)=> {
      // console.log(res.data)
      setTotal(res.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  },[])
  const date = total.map((it)=> it.created_date)
  console.log(date)


  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (title.length < 1) {
      titleRef.current.focus();
      return;
    }

    if(date.includes(created_date)) {
      Swal.fire({
        icon: 'error',
        title: '작성 불가',
        text: '일기는 하루에 한 장만 작성 가능합니다',
      })
    } else {

      if (!isEdit) {
        //   onCreate(created_date, title, content, emotion, image,bookmark);
        const diaryInfo = {
          title,
          content,
          emotion,
          created_date,
          images:[
            {image_url:returnImg}
          ]
        };
        // 일기 작성하기
        writeDiaryListApi(diaryInfo)
          .then((res) => {
            console.log("일기 생성", JSON.stringify(res.data));
            console.log(res.data);
            makePlaylist(res.data.id)
          })
          .catch((err) => {
            console.log(JSON.stringify(err.data));
          });
      }
      // useEffect(()=> {
      if (emotion==='') {
        setTimeout(()=> {
          navigate('/diarylist', { replace: true })
          Swal.fire({
            icon: 'success',
            title: '일기가 저장되었습니다!',
            showConfirmButton: false,
            timer: 1700
          })
        },2500)
      }
  
      if (emotion === "") {
        const spinner = document.getElementById("spinner")
        spinner.classList.remove('display-none')
        spinner.classList.add('display-block')
      }
  
  
      if (isEdit) {
        // 일기 수정하기
        const diaryInfo = {
          title,
          content,
          emotion,
          created_date,
          images:[
            {image_url:returnImg}
          ]
        };
        modifyDiaryItem(originData.id, diaryInfo)
          .then((res) => {
            console.log(res.data);
            console.log(diaryInfo);
          })
          .catch((err) => {
            console.log(JSON.stringify(err.data));
          });
      }
      // }
  
      if (emotion !== '') {
        Swal.fire({
          icon: 'success',
          title: '일기가 수정되었습니다!',
          showConfirmButton: false,
          timer: 1700
        })
        navigate("/diarylist", { replace: true });
      }
    }

  };


  // 원래 일기 정보 보여주는 로직
  useEffect(() => {
    if (isEdit) {
      setCreated_date(getStringdate(new Date(originData.created_date)));
      setEmotion(originData.emotion);
      setTitle(originData.title);
      setcontent(originData.content);
      // setImage(originData.image)
    }
  }, [isEdit, originData]);

  // 감정 선택하면 변하기
  const emotionHappyRef = useRef();
  const emotionSadRef = useRef();
  const emotionDepressedRef = useRef();
  const emotionNormalRef = useRef();
  const emotionAngryRef = useRef();
  const emotionAnxiousRef = useRef();
  const emotionRandomRef = useRef()
  useEffect(() => {
    if (emotion == "기쁨") { 
      // emotionHappyRef.current.style.height = '5vh';
      const happy = document.getElementById('happy')
      emotionHappyRef.current.style.scale = "130%";
    } else {
      emotionHappyRef.current.style.scale = "80%";
    }
    if (emotion == "슬픔") {
      emotionSadRef.current.style.scale = "130%";
    } else {
      emotionSadRef.current.style.scale = "80%";
    }
    if (emotion == "우울") {
      emotionDepressedRef.current.style.scale = "130%";
    } else {
      emotionDepressedRef.current.style.scale = "80%";
    }
    if (emotion == "평온") {
      emotionNormalRef.current.style.scale = "130%";
    } else {
      emotionNormalRef.current.style.scale = "80%";
    }
    if (emotion == "분노") {
      emotionAngryRef.current.style.scale = "130%";
    } else {
      emotionAngryRef.current.style.scale = "80%";
    }
    if (emotion == "불안") {
      emotionAnxiousRef.current.style.scale = "130%";
    } else {
      emotionAnxiousRef.current.style.scale = "80%";
    }
    if (emotion == "") {
      emotionRandomRef.current.style.scale = "110%";
    } else {
      emotionRandomRef.current.style.scale = "80%";
    }
  }, [emotion]);

  return (
    <div className="diary-editor">
      <h4 style={{marginTop:'6vh', marginLeft:"-43vw", fontSize:"27px"}}>오늘의 감정을 골라보세요</h4>
      <div style={{marginTop:'-1vh', marginLeft:"-36vw", fontSize:"17px", color:"grey", marginBottom:"0.3vh"}}>감정을 선택하지 못하시겠다구요? 물음표를 클릭해보세요. </div>
      <div style={{marginTop:'-1vh', marginLeft:"-39vw", marginBottom:"0.3vh", fontSize:"17px", color:"grey"}}>오늘 일기 내용을 바탕으로 감정을 추천해드립니다.</div>
      <div ref={emotionRef} className="select-emotion">
        <img
          src="/assets/img/happy_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("기쁨")}
          ref={emotionHappyRef}
          id="happy"
        ></img>
        <img
          src="/assets/img/sad_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("슬픔")}
          ref={emotionSadRef}
        ></img>
        <img
          src="/assets/img/depressed_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("우울")}
          ref={emotionDepressedRef}
        ></img>
        <img
          src="/assets/img/normal_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("평온")}
          ref={emotionNormalRef}
        ></img>
        <img
          src="/assets/img/angry_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("분노")}
          ref={emotionAngryRef}
        ></img>
        <img
          src="/assets/img/anxious_emoji.png"
          className="emoji-img animate__animated animate__bounceIn"
          onClick={() => handleClickEmote("불안")}
          ref={emotionAnxiousRef}
        ></img>
        <img src="/assets/img/question.png"
         className="emoji-img animate__animated animate__bounceIn"
         onClick={() => setEmotion("")}
         ref={emotionRandomRef}
         ></img>
      </div>
      <input
        value={created_date}
        onChange={(e) => setCreated_date(e.target.value)}
        type="date"
        className="input-date"
      ></input>

      <div className="left-section">
        <div style={{ display: "flex", marginLeft: "3vw" }}></div>
        <textarea
          className="diary-textarea-title"
          placeholder="제목을 입력하세요"
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <textarea
          className="diary-textarea-content"
          placeholder="내용을 입력하세요"
          ref={contentRef}
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        ></textarea>
      </div>

 
      <img src="/assets/img/spinner.gif" 
      style={{position:"absolute",zIndex:"44"}}
      id="spinner"
      className="display-none spinner"
      ></img>


      {/* 오른쪽 영역 */}
      <div className="right-section">

        {/* 이미지 등록 */}
        <div className="diary-img-wrapper">
        
            {imgFile === "" ? (
              <img className="diary-register-img" alt="#" src={previewUrl} />
            ) : null}
            {imgBase64.map((item) => {
              return (
                <div>
                  <img
                    className="diary-register-img"
                    src={item}
                    alt="First Slide"
                  />
                </div>
              );
            })}
    
        </div>

        <div className="diary-register-btn">
          <input
            multiple="multiple"
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={onHandleChangeFile}
            style={{ display: "none" }}
          />
        
            <label for="file">
              <div className="find-file-btn">파일찾기</div>
            </label>

            <Button
              name="사진 등록"
              style={{ width: "75px", fontSize: "15px", 
              marginLeft: "-5vw", marginTop:"-1vh", position:"absolute" }}
              color="#AC5050"
              size="sm"
              onClick={onImgRegisterBtn} />

        </div>
      </div>

      {isEdit?(
  <>  <button class="snip1431 submit-button" onClick={handleSubmit}>수정 완료</button>
  <button
  onClick={() => {
    navigate(-1);
  }}
  className="back-button snip1417"
 >
  수정 취소
 </button>
 </>

)
:(
  <>
<button class="snip1431 submit-button" onClick={handleSubmit}>작성 완료</button>
 <button
 onClick={() => {
   navigate(-1);
 }}
 className="back-button snip1417"
>
 작성 취소
</button>
</>
)
}
    </div>
  );
};

export default DiaryEditor;
