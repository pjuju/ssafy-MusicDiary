import {useState, useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Button from '../../components/Common/Button';
import { getMonthEmotion,getMonthDiary } from '../../api/diaryApi';

import './MainCalender.css'
import MainNote from './MainNote';

const MainCalender =() => {
    const navigate = useNavigate();

    const [getMoment, setMoment]=useState(moment());
 
    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  
    // api 연결하기
    const [noticeData, setNoticeData] = useState([])

    useEffect(()=> {
      getMonthDiary(today.format('M'), today.format('YYYY'))
      .then((res)=> {
        setNoticeData(res.data)
        console.log(res.data)
        console.log('이달의 일기 잘 모아지나',noticeData)
      })
      .catch((e)=> {
        console.log('err',e)
      });
    },[today.format('M')])

    const rightEmotion =(emotion) => {
      if(emotion === '기쁨') {
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
      if(emotion === '분노') {
        return '/assets/img/angry_emoji.png'
      }
      if(emotion === '불안') {
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
                      return(
                        <td key={index} >
                              {/* TODAY */}
                              {noticeData.map(it=> {
                                if (new Date(it.created_date).toLocaleDateString() == days.format('YYYY. M. D.'))
                                  // todayemotion = it.date
                                return <div onClick={()=>{navigate(`/diary/${it.id}`)}}>
                                <img src={rightEmotion(it.emotion)} className="calender-emoji animate__animated animate__bounceIn" style={{cursor:'pointer'}}></img>
                                </div>
                              }
                              )}
                              <p style={{fontSize:"1vw", marginTop:'3vh'}}>TODAY</p>
                            </td>
                        );
                  //   }
                  // })}
                  // 이 달이 아닌 경우(지난달, 다음달의 날짜)
                  }else if(days.format('MM') !== today.format('MM')){
                    return(
                        <td key={index} className="another-month" >
                          {noticeData.map(it=> {
                              if (new Date(it.created_date).toLocaleDateString() == days.format('YYYY. M. D.'))
                              return <div onClick={()=>{navigate(`/diary/${it.id}`)}}>
                                <img src={rightEmotion(it.emotion)} className="calender-emoji animate__animated animate__bounceIn" style={{cursor:'pointer'}}></img>
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
                                <img src={rightEmotion(it.emotion)} className="calender-emoji animate__animated animate__bounceIn" style={{cursor:'pointer'}}></img>
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
            <div className='year-change' style={{marginLeft:'1vw'}}>
              <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'year')) }} className="time-change-button">&#10092; &nbsp;</button>
              <span>{today.format('YYYY 년')}</span>
              <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'year')) }} className="time-change-button">&nbsp; &#10093;	</button>
            </div>
            <div className='month-change' style={{marginLeft:'1vw'}}>
              <button onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }} className="time-change-button" >&#10092; &nbsp;</button>
              <span>{today.format('M 월')}</span>
              <button onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }} className="time-change-button" >&nbsp; &#10093;	</button>
            </div>
          </div>
          <ul onClick={()=>{navigate('/diarylist')}} className="snip1241">
            <li><a href="#" style={{fontSize:"20px",marginLeft:'-3vw'}}>모아보기</a></li>
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

          <Button
                className=" y"
                name="일기 작성"
                style={{ width: "110px", fontSize: "22px", marginLeft: "43vw",color:'black',marginTop:'2vh'}}
                color="#CAD8B5"
                hcolor="#8FB46E"
                size="sm"
                onClick={()=>{navigate('/newdiary')}}
              />
     


        </div>
        <MainNote className="main-note"/>
      </div>
    );
  }


export default MainCalender;