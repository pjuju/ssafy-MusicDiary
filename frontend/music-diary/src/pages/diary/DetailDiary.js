import MainNote from '../mainpages/MainNote'

import { useState, useContext, useEffect, useRef, createRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { DiaryDispatchContext } from "../../App.js";
import {getBookmarkList,getMonthDiary, deleteDiary,makeBookmark} from '../../api/diaryApi';

import './DetailDiary.css'

//  konva 
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";

import { IndividualSticker } from "../sticker-data/individualSticker.tsx";
import { stickersData } from "../sticker-data/stickers.data.ts"

// import "./styles.css"

const DetailDiary =() => {
    const { id } = useParams();

    // 이모티콘 옳게 부착하기
    const rightEmotion =(emotion) => {
      if(emotion === '행복') {
        return '/assets/img/happy_emoji.png'
      }
      if(emotion === '슬픔') {
        return '/assets/img/sad_emoji.png'
      }
      if(emotion === '평온') {
        return '/assets/img/normal_emoji.png'
      }
      if(emotion === '우울') {
        return '/assets/img/depressed_emoji.png'
      }
      if(emotion === '화남') {
        return '/assets/img/angry_emoji.png'
      }
      if(emotion === '놀람') {
        return '/assets/img/anxious_emoji.png'
      }
    }

    // 이달의 전체 일기 정보
    const [noticeMonthData, setNoticeMonthData] = useState([])
    const getMonth = new Date().getMonth() + 1

    useEffect(()=> {
      getMonthDiary(getMonth)
      .then((res)=> {
        setNoticeMonthData(res.data)
        console.log('과!연',res.data)
        console.log('이달의 전체 일기 일단 모으기',noticeMonthData)
      })
      .catch((e)=> {
        console.log('err',e)
      });
    },[])

    const [noticeTitle, setNoticeTitle] = useState('')
    const [noticeContent, setNoticeContent] = useState('')
    const [noticeEmotion, setNoticeEmotion] = useState('')
    const [noticeDate, setNoticeDate] = useState('')
    const [noticeBookmark, setNoticeBookmark] = useState(false)
    const [noticeImage, setNoticeImage] = useState('')

// 더미 데이터
    const diaryList = useContext(DiaryStateContext);

    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const [emotion, setEmotion] = useState('');
    const [date, setDate] = useState('');
    const [bookmark, setBookmark] = useState(false)
    const [image,setImage] = useState('')

    const navigate = useNavigate();

       // konva 
       const [background] = useImage("example-image.jpg");
       const [images, setImages] = useState([]);
   
       const addStickerToPanel = ({ src, width, x, y }) => {
           setImages((currentImages) => [
             ...currentImages,
             {
               width,
               x,
               y,
               src,
               resetButtonRef: createRef()
             }
           ]);
         };
       
         const resetAllButtons = useCallback(() => {
           images.forEach((image) => {
             if (image.resetButtonRef.current) {
               image.resetButtonRef.current();
             }
           });
         }, [images]);
       
         const handleCanvasClick = useCallback(
           (event) => {
             if (event.target.attrs.id === "backgroundImage") {
               resetAllButtons();
             }
           },
           [resetAllButtons]
         );
        //////////////////////////////////////////////////////////////
       //   useEffect

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
    }, []);
    
    useEffect(() => {
        if (noticeMonthData.length >= 1) {
            const targetDiary = noticeMonthData.find(
                (it) => parseInt(it.id) === parseInt(id)
                );
                
                if (targetDiary) {
                    // 일기가 존재할 때
                    setNoticeTitle(targetDiary.title);
                    setNoticeContent(targetDiary.content)
                    setNoticeEmotion(targetDiary.emotion)
                    setNoticeDate(targetDiary.created_at)
                    setNoticeBookmark(targetDiary.bookmark)
                    console.log(targetDiary)
                } else {
                    // 일기가 없을 때
                    alert("없는 일기입니다.");
                    navigate("/calender", { replace: true });
                    
                }
            }
        }, [id, noticeMonthData]);

        

    const strDate = new Date(noticeDate).toLocaleDateString();
    const { onRemove, onEdit } = useContext(DiaryDispatchContext);
    const handleRemove = () => {

        if (window.confirm("정말 삭제하시겠습니까?")) {


        //   useEffect(()=> {
            deleteDiary(id)
            .then((res)=> {
              console.log(res.data)
            })
            .catch((e)=> {
              console.log('err',e)
            });
        //   },[])

          navigate("/diarylist", { replace: true });
        }
      };

    // 북마크 True or False
    // 지금 내가 열고 있는 페이지의 일기 정보
    // const targetDiary = noticeDatas.find(
    //       (it) => parseInt(it.id) === parseInt(id)
    //       );
          
    const bookmarkRef= useRef()

    // 이 버튼을 누르면 이 일기의 북마크가 true <-> false 왔다갔다 하게 됩니다!
    const handleBookmark =() =>{
        // setBookmark(!bookmark)
        // onEdit을 사용해서 이 일기의 전체 정보를 다시 날려줍니다
        // onEdit(noticeData.id, date, title, content, emotion,image,bookmark)
        makeBookmark(id)
        .then((res)=> {
          console.log(res.data)
        })
        .catch((e)=> {
          console.log('err',e)
        });
    }

    
    // 이 일기가 생성될때마다 북마크의 값을 토글처럼 바꾼다!
    useEffect(() => { 
        // setBookmark(!bookmark)

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
            <div className='bookmark'
                ref= {bookmarkRef}
                onClick={()=>{handleBookmark()}}
            ></div>
        <div className='detail-diary-item'>
            <h2 className='title'>{noticeTitle}</h2>
            <p className='date'>작성일자 : {strDate}</p>
            <p className='emotion'>감정 : <img src={rightEmotion(noticeEmotion)}></img></p>
            <p className='content'>{noticeContent}</p>
        </div>
        <button onClick={()=>{navigate(`/edit/${id}`)}} className="edit-button">수정하기</button>
        <button onClick={handleRemove} className="delete-button">삭제하기</button>
        {/* <button onClick={()=>{navigate(`/diarylist`)}} className="goback-button">돌아가기</button> */}
        <hr />
        <hr />
        <Stage
        className='z-index-2'
        width={600}
        height={400}
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
      >
        <Layer>
          <KonvaImage
            image={background}
            height={400}
            width={600}
            id="backgroundImage"
          />
          {images.map((image, i) => {
            return (
              <IndividualSticker
                onDelete={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event) => {
                  image.x = event.target.x();
                  image.y = event.target.y();

                  // console.log("image.x :", image.x)
                  // console.log("image.y:", image.y)
                }}
                key={i}
                image={image}
              />
            );
          })}
        </Layer>
      </Stage>
      <h4 className="heading">Click/Tap to add sticker to photo!</h4>
      {stickersData.map((sticker) => {
        return (
          <button
            className="button"
            onMouseDown={() => {
              addStickerToPanel({
                src: sticker.url,
                width: sticker.width,
                // 처음에 스티커 생성되는 좌표 위치임
                x: 100,
                y: 300
              });
            }}
          >
            <img alt={sticker.alt} src={sticker.url} width={sticker.width} />
          </button>
        );
      })}
        <MainNote className='main-note'></MainNote>

    </div>)
}

export default DetailDiary