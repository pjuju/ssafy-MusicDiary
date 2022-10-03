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
  makePlaylist,
  getPlaylist,
} from "../../api/diaryApi";
import { makeLike } from "../../api/musicApi";
import { getUserStickerListApi } from "../../api/stickerApi";

import "./DetailDiary.css";

// Redux
import { useSelector } from "react-redux";
import { setDiaryBookmarkValue } from "../../store/store";
import { useDispatch } from "react-redux";

//  konva
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";

import { IndividualSticker } from "../sticker-data/individualSticker.tsx";
import { stickersData } from "../sticker-data/stickers.data.ts";

// import "./styles.css"
import {BiCaretRight } from 'react-icons/bi'

// lottie
import Lottie from 'lottie-react'
// import bookmark from '../../store/lottie/bookmark.json'
import BookmarkAnimation from "../../store/lottie/BookmarkAnimation";

// sticker patch method test

const DetailDiary = () => {
  const { id } = useParams();

  const diaryId = id; //

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // diary
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setemotion] = useState("");
  const [date, setDate] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [returnImages, setReturnImages] = useState([]);
  const [returnImage, setReturnImage] = useState();

  const [image, setImage] = useState("");

  const [monthData, setmonthData] = useState([]); // 이달의 전체 일기 정보

  const strDate = new Date(date).toLocaleDateString();

  // redux : bookmark
  // store의 state 값 확인중
  const storeBookmark = useSelector((state) => {
    return state.diarySlice.diaryBookmark;
  });

  //music
  const [musicBtn, setMusicBtn] = useState(false);
  const [musics, setMusics] = useState([]);
  const [heart, setHeart] = useState("");
  const [youtube, setYoutube] = useState("");

  // konva //
  const [background] = useImage("example-image.jpg");
  const [images, setImages] = useState([]);

  const [stickerInfo, setStickerInfo] = useState([]);
  const [test, setTest] = useState({});
  const bookmarkRef = useRef();

  // stickers
  const [originStickers, setOriginStickers] = useState([]); // 저장되어있던 스티커들
  const [editSticker, setEditSticker] = useState(false);
  const [choicePack, setChoicePack] = useState("");
  const [showPacks, setShowPacks] = useState(false);

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
    const user_id = sessionStorage.getItem("user_id");

    // 유저가 소유한 스티커팩 조회
    getUserStickerListApi(user_id)
      .then((res) => {
        // console.log("사용자가 소유한 스티커팩 정보:", JSON.stringify(res.data));
        // console.log("***************************************************");
        // setStickerInfo(res.data);
        let tmp = [];
        res.data.map((ele, i) => {
          tmp.push(ele.stickerpacks);

          // console.log(JSON.stringify(ele.stickerpacks))
          // console.log(tmp)
        });
        // console.log("최종 tmp:", JSON.stringify(tmp));
        setStickerInfo(tmp);

        // image_url
        // const image_url = res.data[0].stickers[0].image_url;
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
        const t = targetDiary.images;

        setTitle(targetDiary.title);
        setContent(targetDiary.content);
        setemotion(targetDiary.emotion);
        setDate(targetDiary.created_date);
        setBookmark(targetDiary.bookmarked);
        setOriginStickers(targetDiary.stickers);
        setReturnImages(targetDiary.images);

        // redux : actions
        dispatch(setDiaryBookmarkValue(bookmark));
        console.log("json 전:", targetDiary);
        console.log("현재 보고 있는 일기는...", JSON.stringify(targetDiary));
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate("/calender", { replace: true });
      }
    }
  }, [id, monthData, bookmark]);

  ///음악
  useEffect(() => {
    makePlaylist(id);
    getPlaylist(id)
      .then((res) => {
        var list = [];
        let video = "";
        for (let i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
          if (res.data[i].like === true) {
            setHeart("♥");
          } else {
            setHeart("♡");
          }
          let test = {
            id: res.data[i].music.id,
            like: res.data[i].like,
            name: res.data[i].music.track_name,
            artist: res.data[i].music.artist_name,
            heart: heart,
          };
          video += res.data[i].music.videoid + ",";
          list.push(test);
        }
        setYoutube(
          "https://www.youtube.com/embed?playlist=" + video.slice(0, -1)
        );
        console.log(
          "https://www.youtube.com/embed?playlist=" + video.slice(0, -1)
        );
        console.log("youtube:", youtube);
        setMusics(list);

        // 버튼 활성화
        setMusicBtn(true);
      })
      .catch((e) => {
        console.log("err", e);
      });
  }, []);

  const likeMusic = (music_id, i) => {
    const txt = document.getElementById("heart" + i);
    if (txt.innerText === "♥") {
      txt.innerText = "♡";
    } else {
      txt.innerText = "♥";
    }
    makeLike(music_id)
      .then((res) => {
        console.log("성공?");
      })
      .catch((e) => {
        console.log("err", e);
      });
  };

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

  // 북마크 다루기 ////////////////////////////////////////
  const handleBookmark = () => {
    // console.log("RETURN IMAGES:", returnImages[0].image_url);
    if (storeBookmark === false) {
      console.log("북마크 state:", bookmark);
      dispatch(setDiaryBookmarkValue(true));
      makeBookmark(id)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          // 만약 북마크가 false라면 makeBookmark api를 활용하여 북마크 등록
        })
        .catch((e) => {
          console.log("err", e);
        });
    }

    if (storeBookmark === true) {
      console.log("북마크 state:", bookmark);
      dispatch(setDiaryBookmarkValue(false));
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

    // 보낼 형식에 맞게 옮기기
    const tmp = [];

    images.map((ele, i) => {
      let element = {
        sticker_id: images[i].sticker_id,
        sticker_x: images[i].x,
        sticker_y: images[i].y,
      };

      tmp.push(element);
      // console.log("추가한 현재 tmp: ", JSON.stringify(tmp));
    });

    // console.log("origin:", JSON.stringify(originStickers));
    originStickers.map((ele, i) => {
      let origin = {
        sticker_id: originStickers[i].sticker.id,
        sticker_x: originStickers[i].sticker_x,
        sticker_y: originStickers[i].sticker_y,
      };

      tmp.push(origin);
    });

    console.log("보내기 직전:", JSON.stringify(tmp));

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

        alert("스티커 저장완료")
      })
      .catch((err) => {});
  };

  // 스티커 삭제 //
  const deleteSticker = (id) => {
    // 화면에 뿌려지는 기존스티커들 => originStickers
    console.log("삭제할 스티커 : ele.id:", id);
    setOriginStickers(originStickers.filter((it) => it.id !== id)); // 삭제 시킨거 현재화면에 바로 반영하려면 필요함

    const stickers = originStickers.filter((it) => it.id !== id);
    console.log("스티커 삭제 후 :", JSON.stringify(stickers));

    // 보낼 형식에 맞게 옮기기
    const tmp2 = [];

    stickers.map((ele, i) => {
      let element = {
        sticker_id: stickers[i].sticker.id,
        sticker_x: stickers[i].sticker_x,
        sticker_y: stickers[i].sticker_y,
      };

      tmp2.push(element);
      // console.log("추가한 현재 tmp: ", JSON.stringify(tmp2))
    });

    const diaryInfo = {
      title,
      content,
      emotion,
      bookmark,
      stickers: tmp2,
    };

    let diary_id = { id };
    diary_id = diary_id.id;
    console.log("보낼 Diary ID :", diaryId);

    modifyDiaryItem(diaryId, diaryInfo)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        console.log("스티커 수정API success");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onEditStickerPos = () => {
    setEditSticker(!editSticker);
  };

  // 스티커팩 선택하기
  const onChangePackChoice = (packName) => {
    console.log("선택한 스티커팩 이름 :", packName);
    setChoicePack(packName);
  };

  // 스티커팩 선택창 보이기
  const onShowStickerPacks = ()=>{
    console.log("showStickerPacks:", showPacks)
    setShowPacks(!showPacks)
  }

  return (
    <>
     
      <div className="detail-diary">
      
        {/* 상단의 북마크 설정 */}
        {storeBookmark === true ? (
          <div
            className="bookmark"
            style={{ backgroundColor: "#547C2B", zIndex: "9000" }}
            ref={bookmarkRef}
            onClick={() => handleBookmark()}
          >
            <BookmarkAnimation />
          </div>

        ) : (
          <div
            className="bookmark"
            style={{ backgroundColor: "#A4BE58", zIndex: "9000" }}
            ref={bookmarkRef}
            onClick={() => handleBookmark()}
          ></div>
        )}


        {/* 일기 title & content */}
        <div className="detail-diary-item" style={{zIndex:"0"}}>
            {/* 상단의 일기 제목 고정으로 */}
            <div className="fix-top">
              <h2 className="title">{title}</h2>
              <p className="date">{strDate}</p>
            {/* <img src={rightEmotion(emotion)} className='emotion'></img> */}
            </div>
            <div className="content">{content}</div>

          
          {returnImages.length >= 1 ? (
            returnImages.map((ele, i) => {
              return (
                <>
            <div className="content-img-wrapper">
                    <img 
                      className="content-image"
                      alt="#" src={"https://" + ele.image_url} />
             </div>
                </>
              );
            })
          ) : (
            <div></div>
          )}
        
        </div>

        {/* 일기별 플레이리스트 */}
        <div className="detail-diary-playlist">
          <iframe
            className="playlist-iframe"

            src={youtube}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          {musicBtn ? (
            <>
              {musics.map((ele, i) => {
                var idName = "heart" + i;
                return (
                  <>
                    {/* <div>
                      {ele.name} - {ele.artist}
                      {ele.like === true ? (
                        <>
                          <div
                            id={idName}
                            style={{
                              zIndex: "9000",
                              cursor: "pointer",
                            }}
                            onClick={(e) => likeMusic(ele.id, i)}
                          >
                            ♥
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            id={idName}
                            style={{
                              zIndex: "9000",
                              cursor: "pointer",
                            }}
                            onClick={(e) => likeMusic(ele.id, i)}
                          >
                            ♡
                          </div>
                        </>
                      )}
                    </div> */}
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div>아직 음악없음</div>
            </>
          )}
        </div>

        {/* 우측상단의 수정, 삭제 버튼 */}
        <div className="btn-area">
          <div
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            className="edit-button"
            style={{ zIndex: "9000" }}
          >
            수정하기
          </div>
          <div
            onClick={handleRemove}
            className="delete-button"
            style={{ zIndex: "9000" }}
          >
            삭제하기
          </div>
        </div>
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
        <div >
          {originStickers.map((ele, i) => {

            return (
              <div
                style={{  width: "1530", height: "700", position: "absolute"}}
              >
                <div>
                <img
                  className="origin-sticker"
                  alt="#"
                  src={ele.sticker.image_url}
                  style={{
                    width: "50px",
                    marginLeft: `${ele.sticker_x}px`,
                    marginTop: `${ele.sticker_y}px`,
                    zIndex:"8000"
                  }}
                />
                </div>
                {/* x 버튼 활성화되는 영역 */}
                <div
                  style={{
                    width: "500",
                    position: "absolute",
                    zIndex: "9000"
                  }}
                >
                  {editSticker ? (
                    <div
                      className="delete-sticker-btn"
                      style={{
                        marginLeft: `${ele.sticker_x}px`,
                       
           
                      }}
                      onClick={() => deleteSticker(ele.id)}
                    >
                      x
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* detail diary 영역 끝 */}

      {/* 5. 스티커 선택창 */}

    <div className="sticker-choice-toggle">
        <div onClick={onShowStickerPacks}>스티커 선택창<BiCaretRight /></div>  
    </div>

{
  showPacks
  ? (
    <>
  <div className="sticker-choice-area">
      <div style={{display:"flex"}}>
        <div className="pack-name-wrapper"  >
          {stickerInfo.map((pack) => {
            return (
              <>
                <div
                  className="sticker-pack-name"
                  onClick={() => onChangePackChoice(pack.name)}
                  >
                  {pack.name}
                </div>
              </>
            );
          })}

        </div>
        <div className="sticker-btn-wrapper">
            <div className="sticker-save-btn" onClick={onSaveStickerPos} >
              스티커 저장
            </div>

            <div className="sticker-edit-btn" onClick={onEditStickerPos}>
              스티커 수정
            </div>
          </div>
        </div>

        {/* <hr /> */}

        {stickerInfo.map((pack) => {
        
        let eachPack = pack.stickers;

          return (
            <>
              {/* <button>{pack.name}</button> */}
              {pack.name === choicePack ? (
                <>
                  <div
                    className="each-pack-wrapper"
                    style={{ marginBottom: "10px", display: "flex" }}
                  >
                    {eachPack.map((sticker, i) => {
                      return (
                        <>
                          <div
                            className="sticker-choice"
                            onClick={() =>
                              console.log("스티커목록의 스티커클릭")
                            }
                            onMouseDown={() => {
                              addStickerToPanel({
                                src: sticker.image_url,
                                width: 40,
                                // 처음에 스티커 생성되는 좌표 위치임
                                x: 500,
                                y: 300,
                                sticker_id: sticker.id,
                              });
                            }}
                          >
                            <img
                              style={{ zIndex: "8000" }}
                              alt="#"
                              src={sticker.image_url}
                              width="40"
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
        {/* 스티커 위치 저장 완료 버튼,,@ */}
        {/* <button onClick={onSaveStickerPos} className="sticker-save-btn">
          저장!
        </button> */}

        {/* 스티커 삭제 활성화하기 */}
        {/* <div className="sticker-edit-btn" onClick={onEditStickerPos}>
          수정
        </div> */}
      </div>
    </>
  )
  :(
    <>

    </>
  )
}
  




      {/* 7. MainNote창 */}
      <div>
        <MainNote className="main-note"></MainNote>
      </div>

      {/* </div> */}
    </>
  );
};

export default DetailDiary;
