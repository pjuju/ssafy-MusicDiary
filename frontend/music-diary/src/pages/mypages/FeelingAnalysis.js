import React, { useEffect, useState } from "react";
import MainNote from "../mainpages/MainNote";

import { ResponsiveRadar } from "@nivo/radar";
import Form from "react-bootstrap/Form";

import axios from "axios";
// redux store
import { useSelector } from "react-redux";
import {
  setNormalChoiceValue,
  setSadChoiceValue,
  setAngryChoiceValue,
  setDepressedChoiceValue,
} from "../../store/store";
import { useDispatch } from "react-redux";
import { patchUserInfoApi } from "../../api/userApi";
import {getMonthDiary,getDiaryListApi } from '../../api/diaryApi';

import Button from '../../components/Common/Button'
import Swal from "sweetalert2";
import "./FeelingAnalysis.css";

const MyResponsiveRadar = ({ data, callMyName, Color }) => (
  <ResponsiveRadar
    data={data}
    keys={[callMyName]}
    indexBy="감정"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: "color" }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: "background" }}
    dotBorderWidth={2}
    colors={{ scheme: Color }}
    blendMode="multiply"
    motionConfig="wobbly"
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);
const FeelingAnalysis = () => {
  const [tmp, setTmp] = useState("일주일");
  const [color, setColor] = useState("paired");

  const [normalMoment, setNormalMoment] = useState("");
  const [sadMoment, setSadMoment] = useState("");
  const [angryMoment, setAngryMoment] = useState("");
  const [depressedMoment, setDepressedMoment] = useState("");


// store의 state 값 확인중
  const storeEmail = useSelector((state) => {
    return state.user.eamil;
  });

  const dispatch = useDispatch();
  const [nowClick, setNowClick] = useState('')

  let callMyName = (e) => {
    // console.log(e.target.value);
    setNowClick(e.target.value)
    // console.log(nowClick)
    setTmp(e.target.value);
    if (e.target.value === "1개월") {
      setColor("set3");
    }
    if (e.target.value === "6개월") {
      setColor("accent");
    }
    if (e.target.value === "1년") {
      setColor("pastel1");
    }
  };

  // 전체 감정일기 가져오기
  const curYearDate = new Date()
  const curMonthDate = new Date()
  const curWeekDate = new Date()
  const curDate = new Date()
  // const cur = new Date(curDate).toLocaleDateString()   // 2022. 9. 28.
  const aYearAgo = new Date(curYearDate.setFullYear(curYearDate.getFullYear() - 1)).toLocaleDateString();  // 2021. 9. 27.
  const aWeekAgo = new Date(curWeekDate.setDate(curWeekDate.getDate() - 6)).toLocaleDateString();  // 2022. 9. 22.
  const sixMonthAgo = new Date(curMonthDate.setMonth(curMonthDate.getMonth() - 5)).toLocaleDateString();  // 2022. 4. 22.

  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    
    const diffDate = date1.getTime() - date2.getTime();
    
    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  }

  const [fullData, setFullData] = useState([])
  const [fulla, setFulla] = useState([])
  useEffect(()=> {
    getDiaryListApi()
    .then((res)=> {
      setFullData(res.data)
      setFulla(res.data)
      console.log(fulla)
      console.log('일단 전체 다이어리 개수는',res.data)
    })
    .catch((e)=> {
      console.log('err',e)
    })
  }, [])

  // 일주일짜리 데이터 가져오기
  const [weekData, setWeekData] = useState([])
  useEffect(()=> {
    setWeekData(fulla.filter((it)=> getDateDiff(it.created_date, aWeekAgo) < 7))
    // console.log(weekData)
  },[nowClick,fullData])
  const weekHappy = weekData.filter((it)=> it.emotion == '기쁨').length
  const weekSad = weekData.filter((it)=> it.emotion == '슬픔').length
  const weekAnxious = weekData.filter((it)=> it.emotion == '불안').length
  const weekAngry = weekData.filter((it)=> it.emotion == '분노').length
  const weekNormal = weekData.filter((it)=> it.emotion == '평온').length
  const weekDepressed = weekData.filter((it)=> it.emotion == '우울').length
  console.log('이번주간',weekHappy,weekSad,weekAnxious,weekAngry,weekNormal,weekDepressed)


  // 한달짜리 데이터 가져오기
  const [monthData, setMonthData] = useState([])
  useEffect(()=> {
    getMonthDiary(curDate.getMonth()+1, curDate.getFullYear())
    .then((res)=> {
      setMonthData(res.data)
      // console.log('이번달의 일기 개수는',res.data)
      // console.log('이번달 감정 갯수',monthHappy,monthSad,monthAnxious,monthAngry,monthNormal,monthDepressed)
    })
    .catch((e)=> {
      console.log('err',e)
    })
  },[nowClick])
  const monthHappy = monthData.filter((it)=> it.emotion == '기쁨').length
  const monthSad = monthData.filter((it)=> it.emotion === '슬픔').length
  const monthAnxious = monthData.filter((it)=> it.emotion === '불안').length
  const monthAngry = monthData.filter((it)=> it.emotion === '분노').length
  const monthNormal = monthData.filter((it)=> it.emotion === '평온').length
  const monthDepressed = monthData.filter((it)=> it.emotion === '우울').length

  // 1년짜리 데이터 가져오기
  const [aYearData, setAYearData] = useState([])
  useEffect(()=> {
    setAYearData(fullData.filter((it)=> getDateDiff(it.created_date, aYearAgo) <365))
    console.log('1년 데이터',aYearData)
    console.log('1년 데이터 개수',yearHappy,yearSad,yearAnxious,yearAngry,yearNormal,yearDepressed)
  },[nowClick])

  const yearHappy = aYearData.filter((it)=> it.emotion == '기쁨').length
  const yearSad = aYearData.filter((it)=> it.emotion == '슬픔').length
  const yearAnxious = aYearData.filter((it)=> it.emotion == '불안').length
  const yearAngry = aYearData.filter((it)=> it.emotion == '분노').length
  const yearNormal = aYearData.filter((it)=> it.emotion == '평온').length
  const yearDepressed = aYearData.filter((it)=> it.emotion == '우울').length
  // 6개월짜리 데이터 가져오기
  const [sixMonthData, setSixMonthData] = useState([])
  useEffect(()=> {
    setSixMonthData(fullData.filter((it)=> getDateDiff(it.created_date, sixMonthAgo) < 150))
    // console.log('6개월 데이터',sixMonthData)
    // console.log('6개월 데이터 개수', sixHappy,sixSad,sixAnxious,sixAngry,sixNormal,sixDepressed)
  },[nowClick])
  const sixHappy = sixMonthData.filter((it)=> it.emotion == '기쁨').length
  const sixSad = sixMonthData.filter((it)=> it.emotion == '슬픔').length
  const sixAnxious = sixMonthData.filter((it)=> it.emotion == '불안').length
  const sixAngry = sixMonthData.filter((it)=> it.emotion == '분노').length
  const sixNormal = sixMonthData.filter((it)=> it.emotion == '평온').length
  const sixDepressed = sixMonthData.filter((it)=> it.emotion == '우울').length


  const data = [
    {
      감정: "기뻐요",
      일주일: weekHappy,
      "1개월": monthHappy,
      "6개월": sixHappy,
      "1년": yearHappy,
    },
    {
      감정: "슬퍼요",
      일주일: weekSad,
      "1개월": monthSad,
      "6개월": sixSad ,
      "1년": yearSad,
    },
    {
      감정: "화나요",
      일주일: weekAngry,
      "1개월": monthAngry,
      "6개월": sixAngry,
      "1년": yearAngry,
    },
    {
      감정: "불안해요",
      일주일: weekAnxious,
      "1개월": monthAnxious,
      "6개월": sixAnxious,
      "1년": yearAnxious,
    },
    {
      감정: "평온해요",
      일주일: weekNormal,
      "1개월": monthNormal,
      "6개월": sixNormal,
      "1년": yearNormal,
    },
    {
      감정: "우울해요",
      일주일: weekDepressed,
      "1개월": monthDepressed,
      "6개월": sixDepressed,
      "1년": yearDepressed,
    },
  ];

  const onChangeNormalMoment = (e) => {
    console.log(e.target.value);

    setNormalMoment(e.target.value);
    
  };

  const onChangeSadMoment = (e) => {
    console.log(e.target.value);

    setSadMoment(e.target.value);
  };

  const onChangeAngryMoment = (e) => {
    console.log(e.target.value);

    setAngryMoment(e.target.value);
  };

  const onChangeDepressedMoment = (e) => {
    console.log(e.target.value);

    setDepressedMoment(e.target.value);
  };

  const onSaveMoodSurveyBtn = (e)=>{
    // 변동된 설문조사 결과 store의 state에 저장하기
    dispatch(setNormalChoiceValue(normalMoment));
    dispatch(setSadChoiceValue(sadMoment));
    dispatch(setAngryChoiceValue(angryMoment));
    dispatch(setDepressedChoiceValue(depressedMoment));

    // 변동된 설문조사 결과를 DB의 user table에 저장하기 // ( userInfo, userId)
    const user_id = sessionStorage.getItem("user_id")
    console.log("user_id:", user_id)

    // 변동된 설문조사 결과값
    const patchUserInfo = {
        "eamil":storeEmail,
        "normal":normalMoment,
        "sad":sadMoment,
        "angry":angryMoment,
        "depressed":depressedMoment
    }

    patchUserInfoApi(patchUserInfo, user_id)
    .then((res)=>{
        console.log(JSON.stringify(res.data))
        Swal.fire({
          icon: 'success',
          title: '취향이 반영되었습니다!',
          showConfirmButton: false,
          timer: 1700
        })
    })
    .catch((err)=>{
        console.log(JSON.stringify(err.data))
    })
    
  }


  return (
    <div className="feeling-analysis">
      <div className="analysis">

        <div className="analysis-graph">
          <h5 className="analysis-page-title">나의 감정 분석</h5>
          <Form.Select
            aria-label="Default select example"
            onChange={callMyName}
            className="analysis-time-form"
          >
            <option value="일주일">일주일</option>
            <option value="1개월">1개월</option>
            <option value="6개월">6개월</option>
            <option value="1년">1년</option>
          </Form.Select>
          <MyResponsiveRadar data={data} callMyName={tmp} Color={color} />
        </div>


        <div className="feeling-music-type">
          <h5 className="analysis-page-title">나의 기분에 따른 음악 취향</h5>
          <div className="music-research">
            <h5>평소에 어떤 음악을 들으시나요?</h5>
            <Form.Select
              aria-label="Default select example"
              onChange={onChangeNormalMoment}
            >
              <option>감정을 선택하세요</option>
              <option value="1">슬픈 노래</option>
              <option value="2">행복한 노래</option>
              <option value="3">잔잔한 노래</option>
              <option value="4">신나는 노래</option>
            </Form.Select>
          </div>
          <div className="music-research">
            <h5>슬플 때 어떤 음악을 들으시나요?</h5>
            <Form.Select 
                aria-label="Default select example"
                onChange={onChangeSadMoment}
            >
              <option>감정을 선택하세요</option>
              <option value="1">슬픈 노래</option>
              <option value="2">행복한 노래</option>
              <option value="3">신나는 노래</option>
              <option value="4">잔잔한 노래</option>
            </Form.Select>
          </div>
          <div className="music-research">
            <h5>화날 때 어떤 음악을 들으시나요?</h5>
            <Form.Select 
                aria-label="Default select example"
                onChange={onChangeAngryMoment}
            >
              <option>감정을 선택하세요</option>
              <option value="1">슬픈 노래</option>
              <option value="2">행복한 노래</option>
              <option value="3">신나는 노래</option>
              <option value="4">잔잔한 노래</option>
            </Form.Select>
          </div>
          <div className="music-research">
            <h5>우울할 때 어떤 음악을 들으시나요?</h5>
            <Form.Select 
              aria-label="Default select example"
              onChange={onChangeDepressedMoment}
          >
              <option>감정을 선택하세요</option>
              <option value="1">슬픈 노래</option>
              <option value="2">행복한 노래</option>
              <option value="3">신나는 노래</option>
              <option value="4">잔잔한 노래</option>
            </Form.Select>
          </div>
          <ul class="snip1226">
            <li>
            <Button name="저장하기" color="#AC5050" hcolor="#DF8787" size="md" onClick={onSaveMoodSurveyBtn} />
            </li>
          </ul>
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
};

export default FeelingAnalysis;
