import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/ChargePoint.css";


import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { FcSalesPerformance } from "react-icons/fc";
import { getUserInfoApi } from "../../api/userApi"; // 사용자 정보 조회
import {
  getTotalStickerListApi,
  getStickerListApi,
  buyStickerPackApi
} from "../../api/stickerApi"; // DB에 저장된 모든 스티커팩 조회

import Button from "../../components/Common/Button";

function ChargePoint() {
  return (
    <>
      <div className="point-charge-wrapper">
        <div className="sticker-page-header">
          포인트 충전 <BiStore />
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
 
          </div>
        </div>
      </div>      

    </>
  )
}

export default ChargePoint