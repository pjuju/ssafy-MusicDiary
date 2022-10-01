import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/ChargePoint.css";
import axios from "axios";


import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { FcSalesPerformance } from "react-icons/fc";
import { getUserInfoApi } from "../../api/userApi"; // 사용자 정보 조회
import {
  getTotalStickerListApi,
  getStickerListApi,
  buyStickerPackApi
} from "../../api/stickerApi"; // DB에 저장된 모든 스티커팩 조회

import Button from "../../components/Common/Button";

// function ChargePoint() {
//   const navigate = useNavigate();
//   const KakaoPayBtn = () => {
//     navigate("/payment")
//   }
  

  class ChargePoint extends React.Component {
    state = {
        next_redirect_pc_url: "",
        tid: "",
        params: {
            cid: "TC0ONETIME",
            partner_order_id: "partner_order_id",
            partner_user_id: "partner_user_id",
            item_name: "5000 포인트충전",
            quantity: 1,
            total_amount: 5000,
            vat_amount: 500,
            tax_free_amount: 0,
            // router에 지정한 PayResult의 경로로 수정
            approval_url: "http://j7d204.p.ssafy.io/payresult",
            fail_url: "http://j7d204.p.ssafy.io/payresult",
            cancel_url: "http://j7d204.p.ssafy.io/payresult",
        },
    };

    componentDidMount() {
        const { params } = this.state;
        const {total_amount} = this.state.params
        console.log(total_amount)
        axios({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
                Authorization: "KakaoAK 1f9e18cf1db33d404f4f7cd9b5030e5a",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((response) => {
            const {
                data: { next_redirect_pc_url, tid , total_amount},
            } = response;

            console.log(next_redirect_pc_url);
            console.log(tid);
            console.log(this.state.params.total_amount)
            // localstorage에 tid 저장
            window.localStorage.setItem("tid", tid);
            window.localStorage.setItem("total_amount", this.state.params.total_amount);
            this.setState({ next_redirect_pc_url, tid ,total_amount});
        });
    }

  render() {
    const { next_redirect_pc_url } = this.state;
    return (
    <>
      <div className="point-charge-wrapper">
        <div className="sticker-page-header">
          포인트 충전 <BiStore />
        </div>
        <a href={next_redirect_pc_url}>
        <img
          className="kakao-pay"
          alt="#"
          src={`${process.env.PUBLIC_URL}/assets/img/kakao-pay.jpg`}
          width="200px" height="100px"
        />
        </a>
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

        // <div>
        //     {/* <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a> */}
        // </div>
    );
}
  }

export default ChargePoint