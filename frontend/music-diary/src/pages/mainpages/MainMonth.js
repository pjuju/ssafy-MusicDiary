import DiaryItem from "../diary/DiaryItem";
import MainNote from "./MainNote";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MainMonth.css'

const MainMonth =() => {
    const dummyList = [
        {
          id : 1,
          title: '떡볶이 최고',
          context : '영화관 가고 싶다 영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다영화관 가고 싶다가고 싶다영화관 가고 싶다',
          emotion: 4,
          created_date: new Date().getTime(),
          bookmark : 0
        },
        {
          id: 2,
          title: '박재범',
          context: '원소주 원해',
          emotion: 5,
          created_date: new Date(),
          bookmark : 1

        },
        {
            id: 3,
            title: '박재범',
            context: '원소주 원해',
            emotion: 5,
            created_date: new Date(),
          bookmark : 1
            
          },
          {
            id: 4,
            title: '박재범',
            context: '원소주 원해',
            emotion: 1,
            created_date: new Date(),
          bookmark : 0

          },
      ] 
    return (
    <div className="main-month">
      <div className="diary-list">
        <h2 className="diary-list-page-title">이달의 일기</h2>
        <div className="diary-items">
          {dummyList.map((it)=> (
            <DiaryItem key={it.id} {...it} className="diary-items">
            </DiaryItem>
          ))}
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>)
}

export default MainMonth;