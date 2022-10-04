import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";

// redux
import { useSelector } from "react-redux";
import { setSadChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

function SignupQuestionTwo() {
  const storeSad = useSelector((state) => {
    return state.user.sadChoice;
  });
  const navigate = useNavigate();

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveQuestionTwo = () => {
    navigate("/signup/question/three");
  };

  const onMoveBack = () => {
    navigate("/signup/question/one");
  };

  const answer = () => {
    if (storeSad == '1') {
      return '슬픈'
    }
    if (storeSad == '2') {
      return '기쁜'
    }
    if (storeSad == '3') {
      return '에너지틱한'
    }
    if (storeSad == '4') {
      return '평온한'
    }
  }

    // 슬픈 / 기쁜 / 에너지틱 / 평온한 노래 선택 -> dispatch
    const onClickSad = () => {
      dispatch(setSadChoiceValue(1))
    }

    const onClickHappy = () => {
      dispatch(setSadChoiceValue(2))
    }

    const onClickEnergy = () => {
      dispatch(setSadChoiceValue(3))
    }

    const onClickNormal = () => {
       dispatch(setSadChoiceValue(4))
    }



  return (
    <>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',width:'45vw',height:'70vh',marginTop:'20vh',marginLeft:'30vw'}}>
            <div  style={{color:'black'}}>
              <h3 style={{marginTop:'5vh'}}>당신의 음악취향은?</h3>
              <h3>
                    2. 나는 슬플 때 
                    <div style={{width:'8vw',height:'5vh',marginLeft:'19vw',borderRadius:'5px'}}>
                    {answer()}
                    </div>
                    노래를 듣는다
                  </h3>
              <div className="first-row">
                <div style={{cursor:'pointer'}}
                  className={answer() == '슬픈' ? "selected-box" : "question-box"}
                  onClick={onClickSad}
                >
                  슬픈
                </div>
                <div style={{cursor:'pointer'}}
                  className={answer() == '기쁜' ? "selected-box" : "question-box"}
                  onClick={onClickHappy}
                >
                  기쁜
                </div>
              </div>

              <div className="second-row">
                <div style={{cursor:'pointer'}}
                  className={answer() == '에너지틱한' ? "selected-e-box" : "question-e-box"}
                  onClick={onClickEnergy}
                >
                  에너지틱한
                </div>
                <div style={{cursor:'pointer'}}
                  className={answer() == '평온한' ? "selected-n-box" : "question-n-box"}
                  onClick={onClickNormal}
                >
                  평온한
                </div>
              </div>

              <div className="next-btn">
                <button
                  onClick={onMoveBack}
                  className="before-button"
                >&#60; 이전</button>
                <button
                  onClick={onMoveQuestionTwo}
                  className="next-button"
                >다음 &#62;</button>
              </div>
            </div>
            <img src="/assets/img/home.png" 
              style={{width:'2vw',marginTop:'4vh',marginLeft:'37vw',cursor:'pointer'}}
              onClick={()=>{navigate('/')}}></img>
          </div>
        </div>


        <img src="/assets/img/signup.png" style={{width:'100vw',height:'100vh'}}></img>
    </>
  )
}

export default SignupQuestionTwo