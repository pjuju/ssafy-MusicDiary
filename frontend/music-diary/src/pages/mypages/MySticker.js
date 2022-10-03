import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../../css/mypages/MySticker.css";

import { BiStore } from "react-icons/bi"; // 상점 이모지
import { getUserStickerListApi } from "../../api/stickerApi"; // 해당 유저의 스티커팩 리스트 조회
import MainNote from "../mainpages/MainNote";
// import StickerItem from '../../components/sticker/StickerItem'
import MyStickerItem from "../../components/sticker/MyStickerItem";

function MySticker() {

  const [mystickerList, setMyStickerList] = useState([])
  const navigate = useNavigate()
 
  
  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id")

    getUserStickerListApi(user_id)
    .then((res)=>{
        setMyStickerList(res.data)
        console.log("사용자가 소유한 스티커팩:", res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]);

  const onMoveStickerStore = () => {
    navigate('/sticker/store')
  }


  return (
    <div className="my-sticker">
      <div className="work-area">
        <h2 className="title">내가 보유한 스티커</h2>
        <div className="store-title">
          <button class="snip0050 red" onClick={onMoveStickerStore}><span>스티커 상점</span><i class="ion-ios-cart"></i></button>
        </div>
        {/* 보유한 스티커가 1개라도 있으면 스티커 아이템 보여주고 없으면 없다고 메시지 알려주기 */}
        <div className="stickers">
        {mystickerList.length !== 0 ? (<>
          {mystickerList.map((it)=> <div className="sticker-area"
          onClick={()=>{navigate(`/sticker/detail/${it.sticker_pack}`)}}>
            <MyStickerItem sticker={it} className="my-sticker-item"
            ></MyStickerItem>
            </div>
            )}
        </>) : (<>
          <div className="no-sticker" style={{marginTop:"15vh"}}>
            현재 보유한 스티커가 없습니다!
        </div>
        </>
        )}
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
}
 
export default MySticker;
