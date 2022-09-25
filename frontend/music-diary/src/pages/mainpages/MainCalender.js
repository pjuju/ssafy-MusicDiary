import {useState, useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { DiaryStateContext } from "../../App";
import { getStringDate } from "../../util/date";
import { DiaryDispatchContext } from "../../App.js";
import { getMonthEmotion,getMonthDiary } from '../../api/diaryApi';

import './MainCalender.css'
import MainNote from './MainNote';

const MainCalender =() => {
    const navigate = useNavigate();
    const diaryList = useContext(DiaryStateContext);

    const [getMoment, setMoment]=useState(moment());

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  
    // api 연결하기
    const [noticeData, setNoticeData] = useState([])
    useEffect(()=> {
      getMonthDiary(new Date().getMonth() + 1, new Date().getFullYear())
      .then((res)=> {
        setNoticeData(res.data)
        console.log(res.data)
        console.log('이달의 일기 잘 모아지나',noticeData)
      })
      .catch((e)=> {
        console.log('err',e)
      });
    },[])

    const rightEmotion =(emotion) => {
      if(emotion === '행복') {
        return '/assets/img/happy_emoji.png'
      }
      if(emotion === '슬픔') {
        return '/assets/img/sad_emoji.png'
      }
      if(emotion === '평온') {
        return '/assets/img/normal_emoji.png'
      }
      if(emotion === '우울') {
        return '/assets/img/depressed_emoji.png'
      }
      if(emotion === '화남') {
        return '/assets/img/angry_emoji.png'
      }
      if(emotion === '놀람') {
        return '/assets/img/anxious_emoji.png'
      }
    }


      const calendarArr=()=>{
        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) {
          result = result.concat(
            <tr key={week}>
              {Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성
                // 오늘 날짜
                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){      
                  // {diaryList.map((it)=> {
                  //   console.log(days.format('YYYY. M. DD.'))         
                  //   console.log(new Date(parseInt(it.date)).toLocaleDateString())
                  //   if(new Date(parseInt(it.date)).toLocaleDateString() == days.format('YYYY. M. DD.')){
                      return(
                        <td key={index} >
                              {/* TODAY */}
                              {noticeData.map(it=> {
                                if (new Date(it.created_date).toLocaleDateString() == days.format('YYYY-MM-DD'))
                                  // todayemotion = it.date
                                return <div onClick={()=>{navigate(`/diary/${it.id}`)}}>
                                <img src={rightEmotion(it.emotion)} className="calender-emoji"></img>
                                </div>
                              }
                              )}
                              오늘
                            </td>
                        );
                  //   }
                  // })}
                  // 이 달이 아닌 경우(지난달, 다음달의 날짜)
                  }else if(days.format('MM') !== today.format('MM')){
                    return(
                        <td key={index} style={{backgroundColor:'#CAD8B5'}} >
                          {noticeData.map(it=> {
    
                              if (new Date(it.created_date).toLocaleDateString() == days.format('YYYY. M. D.'))
                              return <div onClick={()=>{navigate(`/diary/${it.id}`)}}>
                                <img src={rightEmotion(it.emotion)} className="calender-emoji"></img>
                                </div>
                            }
                            )}
                          <span>{days.format('D')}</span>
                        </td>
                    );
                  // 이 달의 다른 날짜들(오늘이 아님)
                  }else{
                    return(
                        <td key={index}>
                            {noticeData.map(it=> {
                              if (new Date(it.created_date).toLocaleDateString() == days.format('YYYY. M. D.'))
                              return <div style={{color:"red"}} onClick={()=>{navigate(`/diary/${it.id}`)}}>
                                <img src={rightEmotion(it.emotion)} className="calender-emoji"></img>
                              </div>
                            }
                            )}
                          <span>{days.format('D')}</span>
                        </td>
                    );
                  }
                })
              }
            </tr>
          );
        }
        return result;
      }

  
    return (
      <div className="main-calender">
        <div className='calender'>
          <div className="control">
            <div className='year-change'>
              <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'year')) }} className="time-change-button">&#10092; &nbsp;</button>
              <span>{today.format('YYYY 년')}</span>
              <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'year')) }} className="time-change-button">&nbsp; &#10093;	</button>
            </div>
            <div className='month-change'>
              <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }} className="time-change-button" >&#10092; &nbsp;</button>
              <span>{today.format('M 월')}</span>
              <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} className="time-change-button" >&nbsp; &#10093;	</button>
            </div>
          </div>
          <button onClick={()=>{navigate('/newdiary')}} className="diary-editor-button">일기 작성</button>
          <ul onClick={()=>{navigate('/diarylist')}} className="snip1241">
            <li><a href="#">모아보기</a></li>
          </ul>          
          <table>
            <tbody>
              <div className='days'>
                <p>Sun</p>
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thu</p>
                <p>Fri</p>
                <p>Sat</p>
                </div> 
              {calendarArr()}
            </tbody>
          </table>
        </div>
        <MainNote className="main-note"/>
      </div>
    );
  }


export default MainCalender;