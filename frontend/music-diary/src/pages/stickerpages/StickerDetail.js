import React, { useEffect, useState } from "react";
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

function StickerDetail() {

  const navigate = useNavigate()

  // 스티커팩 id prop으로 전달
  // const { id } = useParams() // useParams로 받아오는 stickerpack_id
  const stickerpack_id = 1; // 임시값

  // 하나의 스티커팩 정보
  const [packInfo, setPackInfo] = useState({
    stickerpack_id: "",
    stickerpack_price: "300",
    stickerpack: {},
  });

  useEffect(() => {
    getStickerListApi(stickerpack_id)
      .then((res) => {
        setPackInfo(res.data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  });


  // 스티커팩 구매버튼 클릭
  const onBugyStickerPackBtn = () =>{

    buyStickerPackApi(stickerpack_id)
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
    <>
      <div className="sticker-detail-wrapper">
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
          {/* 보유한 스티커 리스트 */}
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
      </div>
    </>
  );
}

export default StickerDetail;
