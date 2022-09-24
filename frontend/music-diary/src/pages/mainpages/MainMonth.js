import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";
import { useEffect, useState, useContext } from "react";
import { DiaryStatecontent } from "../../App";
import {useNavigate} from 'react-router-dom'
import './MainMonth.css'

const MainMonth =() => {

    const navigate = useNavigate();
    const diaryList = useContext(DiaryStatecontent);

    // const strDate = new Date(parseInt(it.date)).toLocaleDateString();

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    
    useEffect(() => {
      const titleElement = document.getElementsByTagName("title")[0];
      titleElement.innerHTML = `감정 일기장`;
    }, []);
  
    useEffect(() => {
      if (diaryList.length >= 1) {
        const firstDay = new Date(
          curDate.getFullYear(),
          curDate.getMonth(),
          1
        ).getTime();
  
        const lastDay = new Date(
          curDate.getFullYear(),
          curDate.getMonth() + 1,
          0,
          23,
          59,
          59
        ).getTime();

        console.log(diaryList)
  
        setData(
          diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
          );
      } else {
        setData([]);
      }
    }, [diaryList, curDate]);
  
    const increaseMonth = () => {
      setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
    };
  
    const decreaseMonth = () => {
      setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
    };
    return (
    <div className="main-month">
      <div className="diary-list">
        <h2 className="diary-list-page-title">
          <div onClick={decreaseMonth}>&#10092;</div>
          {headText}
          <div onClick={increaseMonth}>&#10093;</div>
        </h2>
        <button onClick={()=>{navigate('/newdiary')}}>일기 작성</button>
        <div className="diary-items">
          {data.map((it) => (
            <DiaryItem key={it.id} {...it} className="diary-items" />
          ))}
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}
MainMonth.defaultProps = {
  diaryList: [],
};
export default MainMonth;