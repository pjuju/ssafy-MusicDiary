import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/StickerStore.css"

import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { getUserInfoApi } from "../../api/userApi"; // 사용자 정보 조회 
import { getTotalStickerListApi } from '../../api/stickerApi' // DB에 저장된 모든 스티커팩 조회
import MainNote from "../mainpages/MainNote";
import StickerItem from "../../components/sticker/StickerItem";

function StickerStore() { 

    const [stickerPackList, setStickerPackList] = useState([])

    const [searchWord, setSearchWord] = useState('')
    const [searchState, setSearchState] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
      // 사용자가 현재 보유하고 있는 포인트 불러와서 출력
        const user_id = ''
        getUserInfoApi(user_id)
        .then((res)=>{
          // setStickerPackList(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        // 여기는 상점이니까 DB에 저장된 전체 스티커 보여주기
        getTotalStickerListApi()
        .then((res)=>{
          console.log(res.data)
          setStickerPackList(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    },[])

    const onMoveMyStickerPage = () => {
      navigate('/mypage/mysticker')
    }

    const onMoveStickerDetailPage = (id) => {
      navigate(`/sticker/detail/${id}`)
    }
    
    const onSearchWordHandler = (e) => {
        setSearchWord(e.target.value)


    }

    const onSearchBtn = () => {
        setSearchState(false)

        // const search = totalStickerList.filter((ele)=>
        // ele.sticker)
    }
  
// 검색하면 맞는 스티커를 sticketItem에 프롭스 전송시켜줘야한다!!!!
  const [search, setSearch] = useState('')
  const searchSticker = (e) => {
    setSearch(e.target.value)  // search에 타이핑친 키워드가 저장된다
  }
  
  const stickerPackListName = stickerPackList.filter((it)=> it.name.includes(search))
  console.log(stickerPackListName)
  const stickerPackListNameList = stickerPackList.map((it)=> it.name.includes(search))
  return (
    <div className="sticker-store-page">
    {/* <div className="sticker-store-wrapper">
        <div className="sticker-page-header">상점 <BiStore /></div>

        <div className="sticker-wrapper">
          <div className="header">
            <div className="header-left">
              <input 
                placeholder="스티커 이름을 검색해보세요" 
                onChange={onSearchWordHandler}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onSearchBtn();
                    }
                  }}
                />
            </div>
            <div className="header-right" onClick={onMoveMyStickerPage}>
              나의 스티커
              <BiPlay />
            </div>
          </div>

          <div className="list-wrapper">

            <div className="sticker-info" onClick={onMoveStickerDetailPage}>
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형1 스티커</div>
                </div>
            </div>

            <div className="sticker-info" >
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형2 스티커</div>
                </div>
            </div>

            <div className="sticker-info" >
                <div className="sticker-img">
                    <img alt="#" src="/assets/img/sticker-pack-1.png" />
                </div>
                <div className="sticker-name">
                    <div>도형3 스티커</div>
                </div>
            </div>

          </div>
        </div>
      </div> */}

      <div className="sticker-store">
        <div className="store-header">
          <h1>상점</h1>
          <div>
            <input placeholder="스티커 이름을 검색해보세요" className="store-header-left" 
            onChange={searchSticker} value={search}></input>
            <button className="store-header-right" onClick={()=>{navigate('/mypage/mysticker')}}>내가 보유한 스티커</button>
          </div>
        </div>

        <div className="store-board">
          
          {/* 만약 빈 값이면 다 보여주고 */}
          {search == '' || null ? 
            <StickerItem sticker={stickerPackList}></StickerItem>
            : <StickerItem sticker={stickerPackListName}></StickerItem>
    }
            </div>

        {/* <div className="store-board">
          <StickerItem sticker={stickerPackList}></StickerItem>
        </div> */}
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  )
}

export default StickerStore