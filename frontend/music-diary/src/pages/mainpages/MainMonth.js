import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";

import './MainMonth.css'

const MainMonth =() => {
    const dummyList = [
        {
          id : 1,
          title: '떡볶이 최고',
          context : '영화관 가고 싶다',
          emotion: 4,
          created_date: new Date().getTime()
        },
        {
          id: 2,
          title: '박재범',
          context: '원소주 원해',
          emotion: 5,
          created_date: new Date()
        },
        {
            id: 3,
            title: '박재범',
            context: '원소주 원해',
            emotion: 5,
            created_date: new Date()
          },
          {
            id: 4,
            title: '박재범',
            context: '원소주 원해',
            emotion: 1,
            created_date: new Date()
          },
      ]
    return (
    <div className="main-month">
      {/* <div className="diary-item">
        {dummyList.map((it)=> (
          <DiaryItem key={it.id} {...it} >
          </DiaryItem>
        ))}
      </div> */}
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default MainMonth;