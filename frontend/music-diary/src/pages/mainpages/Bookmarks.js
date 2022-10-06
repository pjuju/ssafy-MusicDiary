import Bookmark from "../diary/Bookmark";
import MainNote from "./MainNote";
import {  useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../../App";
import { getBookmarkList,getDiaryListApi } from "../../api/diaryApi";

import './Bookmarks.css'
import Lottie from 'lottie-react';
import PencilWriting from '../../store/lottie/pencil-writing.json'

const Bookmarks =() => {
    const navigate = useNavigate();
    let diaryList = useContext(DiaryStateContext);

    
    //  api
     
    // 모든 일기 정보를 다 모으기
    const [noticeData, setNoticeData] = useState([])

    useEffect(()=> {
      getDiaryListApi()
      .then((res)=> {
        setNoticeData(res.data)
        console.log("모든 일기:", JSON.stringify(res.data))
        // console.log('모든 일기 잘 모아지나',noticeData)
    })
    .catch((e)=> {
      console.log('err',e)
    });
  },[])
  
  // 북마크 리스트 불러오기
  let bookmark = noticeData.filter(it=> it.bookmarked === true)

  console.log("let bookmark:", JSON.stringify(bookmark));
  useEffect(()=> {
    getBookmarkList()
      .then((res)=>{
          console.log(res.data)
      })
      .catch((err)=>{
          console.log(err.data)
      })
  },[])

    return (
    <div className="bookmark">
      <div className="diary-list">
      <h1 className="bookmarks-page-title">책갈피 모아보기</h1>
       
        <div className="bookmark-items">
          {bookmark.map((it)=> (
            <Bookmark key={it.id} {...it}></Bookmark>
          ))}
        </div>
        
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}

export default Bookmarks;