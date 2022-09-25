import MainNote from "../mainpages/MainNote";

import {
  useState, useContext,
  useEffect, useRef, createRef,
  useCallback,
} from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { DiaryDispatchContext } from "../../App.js";
import {
  getBookmarkList,
  getMonthDiary,
  deleteDiary,
  makeBookmark,
} from "../../api/diaryApi";
import { getTotalStickerListApi } from '../../api/stickerApi'

import "./DetailDiary.css";

//  konva
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";

import { IndividualSticker } from "../sticker-data/individualSticker.tsx";
import { stickersData } from "../sticker-data/stickers.data.ts";

// import "./styles.css"

// sticker patch method test 
import { writeDiaryListApi, modifyDiaryItem } from '../../api/diaryApi';

const DetailDiary = () => {
  const { id } = useParams();

  // 이모티콘 옳게 부착하기
  const rightEmotion = (emotion) => {
    if (emotion === "행복") {
      return "/assets/img/happy_emoji.png";
    }
    if (emotion === "슬픔") {
      return "/assets/img/sad_emoji.png";
    }
    if (emotion === "평온") {
      return "/assets/img/normal_emoji.png";
    }
    if (emotion === "우울") {
      return "/assets/img/depressed_emoji.png";
    }
    if (emotion === "화남") {
      return "/assets/img/angry_emoji.png";
    }
    if (emotion === "놀람") {
      return "/assets/img/anxious_emoji.png";
    }
  };

  // 이달의 전체 일기 정보
  const [noticeMonthData, setNoticeMonthData] = useState([]);
  const getMonth = new Date().getMonth() + 1;

  useEffect(() => {
    getMonthDiary(new Date().getMonth() + 1, new Date().getFullYear())
      .then((res) => {
        setNoticeMonthData(res.data);
        console.log("과!연", res.data);
        console.log("이달의 전체 일기 일단 모으기", noticeMonthData);
      })
      .catch((e) => {
        console.log("err", e);
      });
  }, []);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeEmotion, setNoticeEmotion] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [noticeBookmark, setNoticeBookmark] = useState(false);
  const [noticeImage, setNoticeImage] = useState("");

  // 더미 데이터
  const diaryList = useContext(DiaryStateContext);
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [date, setDate] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  // konva //
  const [background] = useImage("example-image.jpg");
  const [images, setImages] = useState([]);

  const [stickerInfo, setStickerInfo] = useState([]);

  const addStickerToPanel = ({ src, width, x, y, sticker_id }) => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        sticker_id,
        resetButtonRef: createRef(),
      },
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
  ///////////////////////////////////////////////////////////////// 

  useEffect(() => {
  // 전체 스티커팩 조회
    getTotalStickerListApi()
    .then((res)=>{
      // 0번째 스티커팩 정보 가져오기
      const data = res.data[0].stickers

      console.log("useEffect, stickerdata:", data)

      setStickerInfo(data); 


      // image_url 
      const image_url = res.data[0].stickers[0].image_url
      // console.log(data.stickers[0].image_url)
    })
    .catch((err)=>{
      console.log(JSON.stringify(err.data))
    })


    if (noticeMonthData.length >= 1) {
      const targetDiary = noticeMonthData.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      console.log("target diary: ", JSON.stringify(targetDiary))

      if (targetDiary) {
        // 일기가 존재할 때
        setNoticeTitle(targetDiary.title);
        setNoticeContent(targetDiary.content);
        setNoticeEmotion(targetDiary.emotion);
        setNoticeDate(targetDiary.created_date);
        // setNoticeBookmark(targetDiary.bookmark)
        console.log(targetDiary.title);
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
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log("err", e);
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

  const bookmarkRef = useRef();

  // 이 버튼을 누르면 이 일기의 북마크가 true <-> false 왔다갔다 하게 됩니다!
  const handleBookmark = () => {
    // setBookmark(!bookmark)
    // onEdit을 사용해서 이 일기의 전체 정보를 다시 날려줍니다
    // onEdit(noticeData.id, date, title, content, emotion,image,bookmark)
    makeBookmark(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };
  const targetDiary = noticeMonthData.find(
    (it) => parseInt(it.id) === parseInt(id)
  );
  // 이 일기가 생성될때마다 북마크의 값을 토글처럼 바꾼다!
  // useEffect(() => {
  //     // setBookmark(!bookmark)

  //     if (targetDiary.bookmark === true) {
  //         bookmarkRef.current.style.backgroundColor = 'pink'
  //         bookmarkRef.current.style.border = 'none'
  //     }
  //     if (targetDiary.bookmark === false) {
  //         bookmarkRef.current.style.backgroundColor = 'white'
  //         bookmarkRef.current.style.border = 'black 1px solid'
  //     }
  // }, [targetDiary]);


  // 이동시킨 스티커 위치 저장하기 // 
  const onSaveStickerPos = ()=>{
    console.log("현재 스티커 위치: ", JSON.stringify(images))

    // images = 

    console.log("현재 images: ", images)

    // 보낼 형식에 맞게 옮기기 
    const tmp = [
      // {
      //   sticker_id:"",
      //   sticker_x:"",
      //   sticker_y:""
      // }
    ]

    images.map((ele, i)=>{
      let element = {
        sticker_id: images[i].sticker_id,
        sticker_x: images[i].x,
        sticker_y: images[i].y
      }

      tmp.push(element)
      console.log("추가한 현재 tmp: ", JSON.stringify(tmp))
    })

    console.log("push 결과 : tmp", tmp)


      const diaryInfo = {
          title: noticeTitle,
          content: noticeContent,
          emotion: noticeEmotion,
          created_date:"2022-09-25",
          stickers:tmp
      }

      // patch 날려보장
      modifyDiaryItem(id, diaryInfo)
      .then((res)=>{
        console.log("되면 좋겟당")
        console.log(JSON.stringify(res.data))
      })
      .catch((err)=>{

      })

  }

  const [x, setX] = useState("250px");

  return (
    <>
      <div className="detail-diary">

        {/* 1. bookmark */}
        <div
          className="bookmark"
          ref={bookmarkRef}
          onClick={() => {
            handleBookmark();
          }}
        ></div>

          {/* 2. detail-diary-item */}
        <div className="detail-diary-item">
          
          <h2 className="title">{noticeTitle}</h2>

          {/* <div>
            <img style={{position:"relative", top:{x}, left:"100px", zIndex:"900"}} alt="#" src="https://ssafy-d204-alsongdalsong.s3.ap-northeast-2.amazonaws.com/7bd73766-eb07-47bb-9c70-a5eceea6134f" />
          </div> */}

          <p className="date">작성일자 : {strDate}</p>
          <p className="emotion">
            감정 : <img src={rightEmotion(noticeEmotion)}></img>
          </p>
          <p className="content">{noticeContent}</p>
        </div>

          {/* 3. button 영역 */}
      <div className="btn-area">
        <button
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
          className="edit-button"
        >
          수정하기
        </button>
        <button onClick={handleRemove} className="delete-button">
          삭제하기
        </button>
        {/* <button onClick={()=>{navigate(`/diarylist`)}} className="goback-button">돌아가기</button> */}
      </div>
        <hr />
        <hr />

        {/* 4. stage 영역 */}
        <Stage
          className="stage-area"
          width={1300}
          height={400}
          onClick={handleCanvasClick}
          onTap={handleCanvasClick}
        >
          <Layer>
            {images.map((image, i) => {
              return (
                <IndividualSticker
                  className="individual-sticker"

                  onDelete={() => {
                    const newImages = [...images];
                    newImages.splice(i, 1);
                    setImages(newImages);
                  }}
                  onDragEnd={(event) => {
                    image.x = event.target.x();
                    image.y = event.target.y();
                    console.log("stage안의 스티커 선택")
                    console.log("image.x :", image.x)
                    console.log("image.y:", image.y)
                    console.log("image의id: ", image.sticker_id)
                  }}
                  key={i}
                  image={image}
                />
              );
            })}
          </Layer>
        </Stage>

       {/* 5. 스티커 선택창 */}
      <div className="sticker-choice-area">
        <h4 className="heading">Click/Tap to add sticker to photo!</h4>
        {stickerInfo.map((sticker) => {
          return (
            <button
              className="button"
              onClick={()=>console.log("스티커목록의 스티커클릭")}
              onMouseDown={() => {
                addStickerToPanel({
                  src: sticker.image_url,
                  width: 100,
                  // 처음에 스티커 생성되는 좌표 위치임
                  x: 980,
                  y: 300,
                  sticker_id: sticker.id
                });
              }}
            >
              <img alt="#" src={sticker.image_url} width="100" />
             
            </button>
          );
        })}
        
      </div>

        {/* 6. 스티커 위치 저장 완료 버튼,,@ */}
        <button onClick={onSaveStickerPos}>
          스티커 위치 저장 완료!
        </button>


        {/* 7. MainNote창 */}
        <div>
        <MainNote className="main-note"></MainNote>
        </div>

      </div>
    </>
  );
};

export default DetailDiary;
