import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";
import React, { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import { getMonthDiary } from "../../api/diaryApi";
import './MainMonth.css'
import './Dropdown.scss'


// 날짜순, 이모티콘 순으로 정렬하기 로직
  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];
  
  const filterOptionList = [
    { value: "all", name: "전부 보기" },
    { value: "기쁨", name: "행복했던 날" },
    { value: "우울", name: "우울했던 날" },
    { value: "슬픔", name: "슬펐던 날" },
    { value: "평온", name: "평온했던 날" },
    { value: "분노", name: "화났던 날" },
    { value: "불안", name: "놀랐던 날" }
  ];

  const ControlDateMenu = React.memo(({ value, onChange, optionList }) => {
    return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {optionList.map((it, idx) => (
              <option key={idx} value={it.value} style={{color:'black'}}>
                {it.name}
              </option>
            ))}
          </select>
    );
  });



const MainMonth =() => {

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const ControlEmotionMenu = React.memo(({ value, onChange, optionList }) => {
    return (
      <ul class="hList" style={{listStyle:"none"}}>
        <li>
        <a href="#click" class="menu">
        <h2 class="menu-title">감정별</h2>
          <ul
            className="menu-dropdown"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {optionList.map((it, idx) => (
              <li key={idx} value={it.value} style={{color:'black'}} onClick={({e})=>{getProcessedDiaryList(e)}}>
                {it.name}
              </li>
            ))}
          </ul>
         </a>
         </li>
       </ul>
    );
  });

  // 감정별, 날짜별로 분류하는 로직
  
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "행복") {
        const happyDiary = item.emotion == '기쁨'
        return happyDiary
      } 
      if (filter === "슬픔") {
        return item.emotion === '슬픔'
      }
      if (filter === "평온") {
        return item.emotion === '평온'
      }
      if (filter === "우울") {
        return item.emotion === '우울'
      }
      if (filter === "화남") {
        return item.emotion === '분노'
      }
      if (filter === "놀람") {
        return item.emotion === '불안'
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return b.created_date.split("-").join("") - a.created_date.split("-").join("");
      } else {
        return a.created_date.split("-").join("") - b.created_date.split("-").join("");
      }
    };

    // const copyList = JSON.parse(JSON.stringify(data));
    // all이면 전부를, all이 아닌 감정 개별적인 거는 filterCallback에 넘겨주기
    const filteredList =
      filter === "all" ? data : data.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    
    const getMonth = curDate.getMonth() + 1
    const getYear = curDate.getFullYear()
    // 이달의 일기 모아보는 로직
  const [noticeData, setNoticeData] = useState([])
  useEffect(()=> {
    getMonthDiary(curDate.getMonth() + 1, curDate.getFullYear())
    .then((res)=> {
      setNoticeData(res.data)
      console.log(res.data)
      console.log('이달의 일기 잘 모아지나',noticeData)
    })
    .catch((e)=> {
      console.log('err',e)
    });
  },[curDate.getMonth()])
  console.log('지금 일기 개수는',noticeData.length)
  
    useEffect(() => {
      if (noticeData.length >= 1) {
        setData(
          noticeData.filter((it) => 
          curDate.getMonth()+1 === new Date(it.created_date).getMonth()+1)
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
        <div className="fix-top">

        <h2 className="diary-list-page-title">
          <div onClick={decreaseMonth} className="time-change-button">&#10092;</div>
          {headText}
          <div onClick={increaseMonth} className="time-change-button">&#10093;</div>
        </h2>
{/* 감정별, 날짜별 분류 로직 */}
        <ControlDateMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlEmotionMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />


        <button onClick={()=>{navigate('/newdiary')}}>일기 작성</button>
        <ul onClick={()=>{navigate('/calender')}} className="snip1241">
            <li><a href="#">달력보기</a></li>
          </ul>  
        </div>
      <div className="diary-list">
        <div className="diary-items">
          {getProcessedDiaryList().map((it) => (
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