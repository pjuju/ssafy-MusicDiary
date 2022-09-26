import React, { useState } from "react";
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
import { putUserInfoApi } from "../../api/userApi";

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

  let callMyName = (e) => {
    console.log(e.target.value);
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

  const data = [
    {
      감정: "기뻐요",
      일주일: 108,
      "1개월": 113,
      "6개월": 62,
      "1년": 30,
    },
    {
      감정: "슬퍼요",
      일주일: 29,
      "1개월": 100,
      "6개월": 43,
      "1년": 60,
    },
    {
      감정: "화나요",
      일주일: 112,
      "1개월": 76,
      "6개월": 46,
      "1년": 30,
    },
    {
      감정: "불안해요",
      일주일: 50,
      "1개월": 34,
      "6개월": 25,
      "1년": 3,
    },
    {
      감정: "평온해요",
      일주일: 50,
      "1개월": 34,
      "6개월": 25,
      "1년": 14,
    },
    {
      감정: "우울해요",
      일주일: 50,
      "1개월": 34,
      "6개월": 25,
      "1년": 10,
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

    putUserInfoApi(patchUserInfo, user_id)
    .then((res)=>{
        console.log(JSON.stringify(res.data))
        console.log("patch로 기분 설문조사 성공")
    })
    .catch((err)=>{
        console.log(JSON.stringify(err.data))
    })
    
  }

  return (
    <div className="feeling-analysis">
      <div className="analysis">
        <div className="analysis-graph">
          <h2 className="analysis-page-title">나의 감정 분석</h2>
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
          <h2 className="analysis-page-title">나의 기분에 따른 음악 취향</h2>
          <div className="music-research">
            <h4>평소에 어떤 음악을 들으시나요?</h4>
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
            <h4>슬플 때 어떤 음악을 들으시나요?</h4>
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
            <h4>화날 때 어떤 음악을 들으시나요?</h4>
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
            <h4>우울할 때 어떤 음악을 들으시나요?</h4>
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
              <a href="#" data-hover="저장하기" onClick={onSaveMoodSurveyBtn}>
                저장하기
              </a>
            </li>
          </ul>
        </div>
      </div>
      <MainNote className="main-note"></MainNote>
    </div>
  );
};

export default FeelingAnalysis;
