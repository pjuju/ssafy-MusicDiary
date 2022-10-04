import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css"

// redux
import { useSelector } from "react-redux";
import { setAngryChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

function SignupQuestionThree() {
  const storeAngry = useSelector((state) => {
    return state.user.angryChoice;
  });

  const navigate = useNavigate()

    // store의 state바꾸기
const dispatch = useDispatch();

  const onMoveQuestionFour = () =>{
      navigate('/signup/question/four')
  }
  const onMoveBack = ()=> {
    navigate('/signup/question/two')
  }

  const onClickSad = () => {
    dispatch(setAngryChoiceValue(1))
  }

  const onClickHappy = () => {
    dispatch(setAngryChoiceValue(2))
  }

  const onClickEnergy = () => {
    dispatch(setAngryChoiceValue(3))
  }

  const onClickNormal = () => {
    dispatch(setAngryChoiceValue(4))
  }

  const answer = () => {
    if (storeAngry == '1') {
      return '슬픈'
    }
    if (storeAngry == '2') {
      return '기쁜'
    }
    if (storeAngry == '3') {
      return '에너지틱한'
    }
    if (storeAngry == '4') {
      return '평온한'
    }
  }


  return (
    <>  
            <div style={{position:'relative'}}>
              <div style={{position:'absolute',width:'45vw',height:'70vh',marginTop:'20vh',marginLeft:'30vw'}}>
                <div style={{color:'black'}}>
                <h3 style={{marginTop:'5vh'}}>당신의 음악취향은?</h3>
                <h3>
                    3. 나는 화날 때
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
                    <button className="before-button"
                     onClick={onMoveBack}>&#60; 이전</button>
                     <button className="next-button"
                     onClick={onMoveQuestionFour}>다음 &#62;</button>
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

export default SignupQuestionThree