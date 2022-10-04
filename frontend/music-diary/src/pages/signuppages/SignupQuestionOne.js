import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
// redux 확인중
import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

function SignupQuestionOne() {
  const navigate = useNavigate();

  // store의 state 값 확인중
  const storeEmail = useSelector((state) => {
    return state.user.normalChoice;
  });

    // store의 state 값 확인중
    const storeNormal = useSelector((state) => {
      return state.user.normalChoice;
    });

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveQuestionTwo = () => {
    navigate("/signup/question/two");
  };

  // 슬픈 / 기쁜 / 에너지틱 / 평온한 노래 선택 -> dispatch
  const onClickSad = () => {
    dispatch(setNormalChoiceValue(1));
  };

  const onClickHappy = () => {
    dispatch(setNormalChoiceValue(2));
  };

  const onClickEnergy = () => {
    dispatch(setNormalChoiceValue(3));
  };

  const onClickNormal = () => {
      dispatch(setNormalChoiceValue(4));
  };

  const answer = () => {
    if (storeNormal == '1') {
      return '슬픈'
    }
    if (storeNormal == '2') {
      return '기쁜'
    }
    if (storeNormal == '3') {
      return '에너지틱한'
    }
    if (storeNormal == '4') {
      return '평온한'
    }
  }
  console.log(answer())

  return (
    <>
      <div style={{position:'relative'}}>
            <div style={{position:'absolute',width:'45vw',height:'70vh',marginTop:'20vh',marginLeft:'30vw'}}>
              <div>
                <div style={{color:'black'}}>
                  <h3 style={{marginTop:'5vh'}}>당신의 음악취향은?</h3>
                  <h3>
                    1. 나는 평소에 
                    <div style={{width:'8vw',height:'5vh',marginLeft:'19vw',borderRadius:'5px'}}>
                    {answer()}
                    </div>
                    노래를 듣는다
                  </h3>

                  <div className="first-row" >
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
                    <div  style={{cursor:'pointer'}}
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

                  <button
                      onClick={()=>{navigate('/signup/info')}}
                      className="before-button"
                    > 	&#60; 이전</button>
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
  );
}

export default SignupQuestionOne;
