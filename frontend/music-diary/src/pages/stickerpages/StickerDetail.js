import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/StickerDetail.css";

import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { FcSalesPerformance } from "react-icons/fc";
import { getUserInfoApi, getUserApi } from "../../api/userApi"; // 사용자 정보 조회
import {
  getTotalStickerListApi,
  getStickerListApi,
  buyStickerPackApi,
  chargeKakaoPay
} from "../../api/stickerApi"; // DB에 저장된 모든 스티커팩 조회
import { useSelector } from "react-redux";

import Button from "../../components/Common/Button";
import MainNote from "../mainpages/MainNote";

function StickerDetail({}) {
  const {id} = useParams()
  const navigate = useNavigate()

  // 스티커 정보 가져오기
  const [pack, setPack] = useState([])
  const [sticker, setSticker] = useState([])
  useEffect(() => {
    getStickerListApi(id)
      .then((res) => {
        setPack(res.data)
        console.log(res.data.stickers)
        setSticker(res.data.stickers)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  },[]);

  // 스티커팩 구매버튼 클릭
  const onBugStickerPackBtn = () =>{
    console.log(id)
    buyStickerPackApi(id)
    .then((res)=> {
      console.log(res.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  // 사용자 정보 가져오기
  // useEffect(()=> {
  //   getUserApi()
  //   .then((res)=> {
  //     console.log(res.data)
  //   })
  //   .catch((err)=> {
  //     console.log(err)
  //   })
  // },[])

  // 포인트 충전하기 버튼 클릭
  const onMoveChargePage = () => {
    navigate('/sticker/charge')
  }

  return (
    <div className="sticker-detail">
      <div className="work-area">
        <div className="header">
          <img src={pack.thumb_url} className="thumbnail"></img>
          <div className="info">
            <h2>{pack.name}</h2>
            <h5>{pack.price}원</h5>
          </div>
          <div className="pay-buttons">
            <button onClick={onMoveChargePage}>포인트 충전하기</button>
            <button onClick={onBugStickerPackBtn}>구매하기</button>
            <button class="snip1272" onClick={onBugStickerPackBtn}>구매하기</button>
          </div>
        </div>
        <div className="sticker-area">
          {sticker.map((it)=> <img src={it.image_url} className="sticker-image animate__animated animate__bounceIn"></img>)}
        </div>
      {/* <button onClick={() => navigate(-1)} className="goback-button">돌아가기</button> */}
      <ul class="snip1231 goback-button">
        <li><a href="#" style={{color:"black"}}  onClick={() => navigate(-1)}>돌아가기</a></li>
      </ul>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
}

export default StickerDetail;
