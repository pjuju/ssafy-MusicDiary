import Bookmark from "../diary/Bookmark";
import MainNote from "./MainNote";
import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../../App";

import './Bookmarks.css'

const Bookmarks =() => {
    const navigate = useNavigate();
    let diaryList = useContext(DiaryStateContext);
    console.log(diaryList)

    return (
    <div className="bookmark">
      <div className="diary-list">
      <h2 className="bookmarks-page-title">책갈피 모아보기</h2>
        <div className="bookmark-items">
          {diaryList.filter(it=> it.bookmark === true).map((it)=> (
            <Bookmark key={it.id} {...it}></Bookmark>
          ))}
        
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}

export default Bookmarks;