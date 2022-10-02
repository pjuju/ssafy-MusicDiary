import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../../css/mypages/MySticker.css";

import { BiStore } from "react-icons/bi"; // 상점 이모지
import { getUserStickerListApi } from "../../api/stickerApi"; // 해당 유저의 스티커팩 리스트 조회
import MainNote from "../mainpages/MainNote";
import StickerItem from '../../components/sticker/StickerItem'

function MySticker() {

  const [mystickerList, setMyStickerList] = useState([])
  const navigate = useNavigate()
 
  
  useEffect(() => {

    const user_id = sessionStorage.getItem("user_id")
    console.log(user_id)

    getUserStickerListApi(13)
    .then((res)=>{
        setMyStickerList(res.data)
        console.log(mystickerList)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]);

  const onMoveStickerStore = () => {
    navigate('/sticker/store')
  }

  console.log(mystickerList.length)

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
        <h2 className="title">내가 보유한 스티커</h2>
        <button class="snip0050 red" onClick={onMoveStickerStore}><span>스티커 상점</span><i class="ion-ios-cart"></i></button>
        {/* 보유한 스티커가 1개라도 있으면 스티커 아이템 보여주고 없으면 없다고 메시지 알려주기 */}
        {mystickerList.length !== 0 ? (<>
          {mystickerList.map((it)=> 
            <StickerItem sticker={it}></StickerItem>
            )}
        </>) : (<>
          <div className="no-sticker" style={{marginTop:"15vh"}}>
            현재 보유한 스티커가 없습니다!
        </div>
        </>
        )}
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
}

export default MySticker;
