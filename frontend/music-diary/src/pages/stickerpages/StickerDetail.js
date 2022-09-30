import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/StickerDetail.css";

import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { FcSalesPerformance } from "react-icons/fc";
import { getUserInfoApi } from "../../api/userApi"; // 사용자 정보 조회
import {
  getTotalStickerListApi,
  getStickerListApi,
  buyStickerPackApi
} from "../../api/stickerApi"; // DB에 저장된 모든 스티커팩 조회

import Button from "../../components/Common/Button";
import MainNote from "../mainpages/MainNote";

function StickerDetail({}) {
  const {id} = useParams()
  const navigate = useNavigate()

  const [img, setImg] = useState('')
  const [title, setTitle] = useState('')

  // if (sticker.length >= 1) {
  //   const targetSticker = sticker.find(
  //     (it) => parseInt(it.id) === parseInt(id)
  //   );
  //   console.log(targetSticker)

  //   // if (targetSticker) {
  //   //   // 일기가 존재할 때
  //   //   // setTitle(targetSticker.title)
  //   //   // setImg(targetSticker.img)
  //   // }
  // }


  // 하나의 스티커팩 정보
  const [packInfo, setPackInfo] = useState({
    stickerpack_id: "",
    stickerpack_price: "300",
    stickerpack: {},
  });

  const [pack, setPack] = useState([])


  useEffect(() => {
    getStickerListApi(id)
      .then((res) => {
        setPackInfo(JSON.stringify(res.data));
        console.log(res.data)
        setPack(res.data)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  },[]);

  // 스티커팩 구매버튼 클릭
  const onBugyStickerPackBtn = () =>{

    buyStickerPackApi(packInfo.stickerpack_id)
    .then((res)=> {
      console.log(res.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  // 포인트 충전하기 버튼 클릭
  const onMoveChargePage = () => {
    navigate('/sticker/charge')
  }


  return (
    <div className="sticker-detail">
      <button onClick={() => navigate(-1)} className="goback-button">돌아가기</button>
      
      {/* <div className="sticker-detail-wrapper">
        <div className="sticker-page-header">
          상점 <BiStore />
        </div>

        <div className="sticker-wrapper">
          <div className="header">
            <div className="header-left"></div>
            <div className="header-right">
              나의 스티커
              <BiPlay />
            </div>
          </div>
          <div className="list-wrapper">
            <div className="sticker-info">
              <div className="sticker-left-img">
                <img alt="#" src="/assets/img/sticker-pack-1.png" />
              </div>

              <div className="sticker-right-info">
                <div className="sticker-name">
                  <div>
                    도형1 스티커 
                  </div>
                </div>

                <div className="sticker-buy-charge-wrapper">
                  <div>
                  <FcSalesPerformance /> 500
                  </div>
                  <div className="sticker-buy-btn">
                    <Button name="구매하기" color="#1676F3" size="sm" onClick={onBugyStickerPackBtn} />
                  </div>
                  <div className="sticker-point-charge">
                    <Button name="충전하기" color="#E22020" size="sm" onClick={onMoveChargePage} />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticker-list-wrapper">
            <img alt="#" src="/assets/img/sticker-pack-1.png" />

            </div>
          </div>
        </div>
      </div> */}
      
      <div className="work-area">
        <div className="header">
            <img src={pack.thumb_url} className="thumbnail" style={{width:'15vw'}}></img>
            <div className="info">
              {pack.name}
              {pack.price}
            </div>
        </div>
      {/* {packInfo.name} */}
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
}

export default StickerDetail;
