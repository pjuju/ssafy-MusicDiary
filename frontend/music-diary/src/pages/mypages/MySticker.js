import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../../css/mypages/MySticker.css";

import { BiStore } from "react-icons/bi"; // 상점 이모지
import { getUserStickerListApi } from "../../api/stickerApi"; // 해당 유저의 스티커팩 리스트 조회
import MainNote from "../mainpages/MainNote";

function MySticker() {

  const [mystickerList, setMyStickerList] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {

    const user_id = ''

    getUserStickerListApi(user_id)
    .then((res)=>{
        setMyStickerList(res.data)
    })
    .catch((err)=>{

    })
  },[]);

  const onMoveStickerStore = () => {
    navigate('/sticker/store')
  }

  return (
    <div className="my-sticker">
      {/* <div className="mysticker-wrapper">
        <div className="sticker-page-header">나의 스티커</div>

        <div className="sticker-wrapper">
          <div className="header">
            <div className="header-left">
              <input placeholder="스티커 이름을 검색해보세요" />
            </div>
            <div className="header-right" onClick={onMoveStickerStore}>
              상점
              <BiStore  />
            </div>
          </div>

          <div className="list-wrapper">

            <div className="sticker-info" >
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형 스티커</div>
                </div>
            </div>

            <div className="sticker-info" >
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형 스티커</div>
                </div>
            </div>

            <div className="sticker-info" >
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형 스티커</div>
                </div>
            </div>

          </div>
        </div>
      </div> */}
      <div className="work-area">
        <div className="header-right" onClick={onMoveStickerStore}>
          상점
          <BiStore  />
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
}

export default MySticker;
