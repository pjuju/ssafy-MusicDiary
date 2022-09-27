import MainNote from "../mainpages/MainNote";

import {
  useState,
  useContext,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { getStringDate } from "../../util/date";
import {
  getMonthDiary,
  deleteDiary,
  makeBookmark,
  deleteBookmark,
  modifyDiaryItem,
} from "../../api/diaryApi";
import { getTotalStickerListApi } from "../../api/stickerApi";

import "./DetailDiary.css";

//  konva
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";

import { IndividualSticker } from "../sticker-data/individualSticker.tsx";
import { stickersData } from "../sticker-data/stickers.data.ts";

// import "./styles.css"

// sticker patch method test

const DetailDiary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // diary
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setemotion] = useState("");
  const [date, setDate] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [image, setImage] = useState("");

  const [monthData, setmonthData] = useState([]); // 이달의 전체 일기 정보

  const strDate = new Date(date).toLocaleDateString();

  // konva //
  const [background] = useImage("example-image.jpg");
  const [images, setImages] = useState([]);

  const [stickerInfo, setStickerInfo] = useState([]);
  const bookmarkRef = useRef();

  // stickers
  const [originStickers, setOriginStickers] = useState([]);

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

  useEffect(() => {
    getMonthDiary(new Date().getMonth() + 1, new Date().getFullYear())
      .then((res) => {
        setmonthData(res.data);
        console.log("과!연", res.data);
        console.log("이달의 전체 일기 일단 모으기", monthData);
      })
      .catch((e) => {
        console.log("err", e);
      });
  }, []);
  //
  useEffect(() => {
    // 전체 스티커팩 조회
    getTotalStickerListApi()
      .then((res) => {
        // 0번째 스티커팩 정보 가져오기
        const data = res.data[0].stickers;

        console.log("useEffect, stickerdata:", data);

        setStickerInfo(data);

        // image_url
        const image_url = res.data[0].stickers[0].image_url;
        // console.log(data.stickers[0].image_url)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });

    if (monthData.length >= 1) {
      const targetDiary = monthData.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        // 일기가 존재할 때
        setTitle(targetDiary.title);
        setContent(targetDiary.content);
        setemotion(targetDiary.emotion);
        setDate(targetDiary.created_date);
        setBookmark(targetDiary.bookmarked);
        setOriginStickers(targetDiary.stickers);
        console.log("현재 보고 있는 일기는...", JSON.stringify(targetDiary));
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/calender", { replace: true });
      }
    }
  }, [id, monthData]);
  //
  // useEffect(() => {
  //   // 이 다이어리가 새로 렌더링될 때마다 bookmark 정보 바꿔주기
  //   const diaryInfo = {
  //     title,
  //     content,
  //     emotion,
  //     bookmark,
  //   };
  //   modifyDiaryItem(id, diaryInfo)
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log(diaryInfo);
  //     })
  //     .catch((err) => {
  //       console.log(JSON.stringify(err.data));
  //     });

  //   const targetDiary = monthData.find(
  //     (it) => parseInt(it.id) === parseInt(id)
  //   );

  //   console.log(targetDiary);

  //   if (targetDiary.bookmarked === false) {
  //     bookmarkRef.current.style.backgroundColor = "yellow";
  //     bookmarkRef.current.style.border = "none";
  //   }
  //   if (targetDiary.bookmarked === true) {
  //     bookmarkRef.current.style.backgroundColor = "white";
  //     bookmarkRef.current.style.border = "black 1px solid";
  //   }
  // }, [targetDiary]);

  //

  //////////////////////////////////////////////////////////////////////////////
  // 다이어리 remove 함수
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

  const targetDiary = monthData.find((it) => parseInt(it.id) === parseInt(id));

  const handleBookmark = () => {
    if (targetDiary.bookmarked === false) {
      console.log(targetDiary.bookmarked);
      makeBookmark(id)
        .then((res) => {
          console.log(res.data);
          // 만약 북마크가 false라면 makeBookmark api를 활용하여 북마크 등록
        })
        .catch((e) => {
          console.log("err", e);
        });
    }
    if (targetDiary.bookmarked === true) {
      deleteBookmark(id)
        .then((res) => {
          console.log(res.data);
          // 만약 북마크가 true라면 deleteBookmark api를 활용하여 북마크 해제
        })
        .catch((e) => {
          console.log("err", e);
        });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////

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

  const resetAllButtonsOrigin = useCallback(() => {
    originStickers.forEach((ele) => {
      if (ele.resetButtonRef.current) {
        ele.resetButtonRef.current();
      }
    });
  }, [originStickers]);


  const handleCanvasClick = useCallback(
    (event) => {
      if (event.target.attrs.id === "backgroundImage") {
        resetAllButtons();
      }
    },
    [resetAllButtons]
  );

  // 이동시킨 스티커 위치 저장하기 : modifyDiaryItem API //
  const onSaveStickerPos = () => {
    console.log("현재 스티커 위치: ", JSON.stringify(images));
    console.log("현재 images: ", images);

    // 보낼 형식에 맞게 옮기기
    const tmp = [
      // {
      //   sticker_id:"",
      //   sticker_x:"",
      //   sticker_y:""
      // }
    ];

    images.map((ele, i) => {
      let element = {
        sticker_id: images[i].sticker_id,
        sticker_x: images[i].x,
        sticker_y: images[i].y,
      };

      tmp.push(element);
      // console.log("추가한 현재 tmp: ", JSON.stringify(tmp))
    });
    const diaryInfo = {
      title,
      content,
      emotion,
      bookmark,
      stickers: tmp,
    };

    // patch 날려보장
    modifyDiaryItem(id, diaryInfo)
      .then((res) => {
        console.log("되면 좋겟당");
        console.log(JSON.stringify(res.data));
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="detail-diary">
        {/* 상단의 북마크 설정 */}
        <div
          className="bookmark"
          ref={bookmarkRef}
          onClick={() => {
            handleBookmark();
          }}
        ></div>
        {/* 상단의 일기 제목 고정으로 */}
        <div className="fix-top">
          <h2 className="title">{title}</h2>
          <p className="date">{strDate}</p>
          <img src={rightEmotion(emotion)} className="emotion"></img>
        </div>

        {/* 일기 content */}
        <div className="detail-diary-item">
          <div className="content">{content}</div>
        </div>

        {/* 일기별 플레이리스트 */}
        <div className="detail-diary-playlist"></div>

        {/* 우측상단의 수정, 삭제 버튼 */}
        <div className="btn-area">
          <button
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            className="edit-button"
            style={{zIndex:'9999999999'}}
          >
            수정하기
          </button>
          <button onClick={handleRemove} className="delete-button" style={{zIndex:'9999999999'}}>
            삭제하기
          </button>
        </div>
        {/* <button onClick={()=>{navigate(`/diarylist`)}} className="goback-button">돌아가기</button> */}
        {/* 4. stage 영역 */}
        <Stage
          className="stage-area"
          width={1530}
          height={700}
          onClick={handleCanvasClick}
          onTap={handleCanvasClick}
          id="backgroundImage"
        >
          <Layer>
            {images.map((image, i) => {
              return (
                <div>
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
                    console.log("stage안의 스티커 선택");
                    console.log("image.x :", image.x);
                    console.log("image.y:", image.y);
                    console.log("image의id: ", image.sticker_id);
                  }}
                  key={i}
                  image={image}
                />
              </div>
              );
            })}
          </Layer>
        </Stage>

     {/* 저장됐었던 sticker 배치 */}
     <div>
        {originStickers.map((ele, i) => {
          console.log("origin:", JSON.stringify(ele))
          
         
          console.log("x:", ele.sticker_x)

          return (
            <div style={{position:"relative"}}>
            <div style={{width:"1530", height:"700", position:"absolute", zIndex:'999999999999999'}}>
              <img
                alt="#"
                src={ele.sticker.image_url}
                style={{
                  // position: "absolute",
                  width: "100px",
                  marginLeft: `${ele.sticker_x}px`,
                  marginTop: `${ele.sticker_y}px`,
                  zIndex:"2000"
                }}
                onClick={()=>console.log(`${ele.sticker_x} px`)}
              />
              </div>

            </div>
          );
        })}
      </div>


      </div>

 

      {/* 6. 스티커 위치 저장 완료 버튼,,@ */}
      <button onClick={onSaveStickerPos} style={{position:'absolute', zIndex:'99999999999999999999'}}>스티커 위치 저장 완료!</button>
      {/* 5. 스티커 선택창 */}
      <div
        className="sticker-choice-area"
        style={{ position: "absolute", marginTop: "80vh" }}
      >
        <h4 className="heading">Click/Tap to add sticker to photo!</h4>
        {stickerInfo.map((sticker) => {
          return (
            <button
              className="button"
              onClick={() => console.log("스티커목록의 스티커클릭")}
              onMouseDown={() => {
                addStickerToPanel({
                  src: sticker.image_url,
                  width: 100,
                  // 처음에 스티커 생성되는 좌표 위치임
                  x: 500,
                  y: 300,
                  sticker_id: sticker.id,
                });
              }}
            >
              <img alt="#" src={sticker.image_url} width="100" />
            </button>
          );
        })}
      </div>
      {/* 7. MainNote창 */}
      <div>
        <MainNote className="main-note"></MainNote>
      </div>

      {/* </div> */}
    </>
  );
};

export default DetailDiary;
