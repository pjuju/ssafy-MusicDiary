import Bookmark from "../diary/Bookmark";
import MainNote from "./MainNote";
import { useNavigate } from "react-router-dom";

import './Bookmarks.css'

const Bookmarks =() => {
    const navigate = useNavigate();
    const dummyList = [
        {
          id : 1,
          title: '떡볶이 최고',
          context : '영화관 가고 싶다 영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다',
          emotion: 4,
          created_date: new Date().getTime(),
          img : 0
        },
        {
          id: 2,
          title: '박재범',
          context: '원소주 원해 원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해원소주 원해 원소주 원해 원소주 원해원소주 원해원소주 원해원소주 원소주 원해 원소주 원해원소주 원해원소주 원해원소주 원소주 원해 원소주 원해원소주 원해원소주 원해원소주 원소주 원해 원소주 원해원소주 원해원소주 원해원소주 원소주 원해 원소주 원해원소주 원해원소주 원해원소주 ',
          emotion: 5,
          created_date: new Date(),
          img: 1
        },
        {
            id: 3,
            title: '제주도 가고싶다',
            context: '한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산한라산',
            emotion: 5,
            created_date: new Date(),
            img:0
          },
          {
            id: 4,
            title: '오예',
            context: '오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예오예',
            emotion: 1,
            created_date: new Date(),
            img:0
          },
      ]
    return (
    <div className="bookmark">
      <div className="diary-list">
      <h2 className="bookmarks-page-title">책갈피 모아보기</h2>
        <div className="bookmark-items">
          {dummyList.map((it)=> (
            <Bookmark key={it.id} {...it} >
            </Bookmark>
          ))}
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}

export default Bookmarks;