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
  chargeKakaoPay,
  getUserStickerListApi
} from "../../api/stickerApi"; // DB에 저장된 모든 스티커팩 조회
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

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
        // console.log(res.data)
        // console.log(res.data.stickers)
        setSticker(res.data.stickers)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });
  },[]);


  // 스티커팩 구매버튼 클릭
  const user_id = sessionStorage.getItem("user_id")
  const sticker_pack = {
    sticker_pack: pack.id
  }

  const onBugStickerPackBtn = () =>{
    setThisIsMine(true)
    buyStickerPackApi(user_id,sticker_pack)
    .then((res)=> {
      console.log(JSON.stringify(res.data))
      Swal.fire({
        icon: 'success',
        title: '구매 완료!',
        text: '스티커 팩 구매가 완료되었습니다.',
      })
    })
    .catch((err)=> {
      console.log(err)
    })
    if (point < pack.price) {
      Swal.fire({
        icon: 'error',
        title: '충전이 필요해요!',
        text: '카카오페이를 이용하여 포인트를 충전해주세요.',
      })
    }
  }



  const [thisIsMine, setThisIsMine] = useState(false)
  const [myStickerList, setMyStickerList ] = useState([])
  const mystickerNumber = myStickerList.map((it)=> it.sticker_pack)
  // 내가 산 스티커 정보 불러오기
// 구매완료 버튼을 불러오기 위함
useEffect(()=> {
  getUserStickerListApi(user_id)
  .then((res)=> {
    console.log(res.data)
    setMyStickerList(res.data)
  })
  .catch((err)=> { 
    console.log(err)
  })
},[])


  useEffect(()=> {
    // 만약 내가 이 스티커 산거면 true다
    if (mystickerNumber.includes(pack.id)) {
      console.log('나 이 스티커 샀음')
      setThisIsMine(true)
    } else { // 아니면 false다
      console.log('아직 구매 전임')
      setThisIsMine(false)
    }
  })
  console.log(thisIsMine)


  const button = () => {

    if (thisIsMine === true) {
      return (
      <>
        <div style={{marginLeft:"-2.5vw", marginTop:'5vh'}}>
        <button className="snip1444" style={{marginLeft:'-1vw'}}>구매완료</button>
          <button onClick={onMoveChargePage} className="snip14" style={{marginLeft:'1vw'}}>포인트 충전하기</button>
        </div>
      </>)
    } else {
      return (<>
        <div style={{marginLeft:"-2.5vw", marginTop:'5vh'}}>
          <button onClick={onBugStickerPackBtn} className="snip144" style={{marginLeft:'-1vw'}}>구매하기</button>
          <button onClick={onMoveChargePage} className="snip14" style={{marginLeft:'1vw'}}>포인트 충전하기</button>
        </div>
      </>
      )
    }
  }




  // 사용자 정보 가져오기
  // 포인트 조회하기 위함
  const [point, setPoint] = useState('')
  useEffect(()=> {
    getUserInfoApi(user_id)
    .then((res)=> {
      // console.log(JSON.stringify(res.data))
      setPoint(res.data.data.point)
    })
    .catch((err)=> {
      console.log(err)
    })
  },[])




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
          <div style={{display:"flex",marginLeft:'42vw',width:'20vw'}}>
            {button()}
            {/* {thisIsMine === true? (<div style={{marginRight:'1vw',marginTop:'2vh'}}>
              구매 완료
            </div>) : (<div style={{marginRight:'1vw',marginTop:'2vh'}}>
              <button onClick={onBugStickerPackBtn}>구매하기</button>
            </div>)}
            <button onClick={onMoveChargePage} className="charge-point snip14">포인트 충전하기</button> */}
            {/* <button class="snip1272" onClick={onBugStickerPackBtn}>구매하기</button> */}
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
