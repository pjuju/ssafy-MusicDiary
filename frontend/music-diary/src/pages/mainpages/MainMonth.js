import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";
import { useEffect, useState, useContext } from "react";
import { DiaryStateContext } from "../../App";
import {useNavigate} from 'react-router-dom'
import { getDiaryListApi,getMonthDiary } from "../../api/diaryApi";
import './MainMonth.css'

const MainMonth =() => {
  const [noticeData, setNoticeData] = useState([])
  useEffect(()=> {
    getMonthDiary(getMonth)
    .then((res)=> {
      setNoticeData(res.data)
      console.log(res.data)
      console.log('이달의 일기 잘 모아지나',noticeData)
    })
    .catch((e)=> {
      console.log('err',e)
    });
  },[])


    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    const getMonth = curDate.getMonth() + 1
    
    useEffect(() => {
      const titleElement = document.getElementsByTagName("title")[0];
      titleElement.innerHTML = `감정 일기장`;
    }, []);
  
    useEffect(() => {
      if (noticeData.length >= 1) {
        // const firstDay = new Date(
        //   curDate.getFullYear(),
        //   curDate.getMonth(),
        //   1
        // ).toLocaleDateString()
        
        // const lastDay = new Date(
        //   curDate.getFullYear(),
        //   curDate.getMonth() + 1,
        //   0,
        //   23,
        //   59,
        //   59
        // ).toLocaleDateString();

        setData(
          noticeData.filter((it) => 
          curDate.getMonth()+1 === new Date(it.created_at).getMonth()+1)
          );
      } else {
        setData([]);
      }
    }, [noticeData, curDate]);

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
          <div onClick={decreaseMonth} className="time-change-button">&#10092;</div>
          {headText}
          <div onClick={increaseMonth} className="time-change-button">&#10093;</div>
        </h2>
        <button onClick={()=>{navigate('/newdiary')}}>일기 작성</button>
        <ul onClick={()=>{navigate('/calender')}} className="snip1241">
            <li><a href="#">달력보기</a></li>
          </ul>  
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