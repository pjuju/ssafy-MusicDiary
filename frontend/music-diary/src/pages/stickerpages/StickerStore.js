import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../../css/mypages/MySticker.css";
import "../../css/stickerpages/StickerStore.css"

import { BiPlay, BiStore } from "react-icons/bi"; // 상점 이모지
import { getUserInfoApi } from "../../api/userApi"; // 사용자 정보 조회 
import { getTotalStickerListApi } from '../../api/stickerApi' // DB에 저장된 모든 스티커팩 조회

function StickerStore() { 

    const [stickerPackList, setStickerPackList] = useState([])

    const [searchWord, setSearchWord] = useState('')
    const [searchState, setSearchState] = useState(false);

    const navigate = useNavigate()

    // 사용자가 현재 보유하고 있는 포인트 불러와서 출력
    useEffect(()=>{
        const user_id = ''
        getUserInfoApi(user_id)
        .then((res)=>{
          setStickerPackList(res.data)
        })
        .catch((err)=>{

        })


        getTotalStickerListApi()
        .then((res)=>{

        })
        .catch((err)=>{

        })
    })

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

  return (
    <>
    <div className="sticker-store-wrapper">
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
          {/* 보유한 스티커 리스트 */}
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
      </div>
    </>
  )
}

export default StickerStore