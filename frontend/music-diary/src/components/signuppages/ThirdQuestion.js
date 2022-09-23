import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css"
import Button from "../Common/Button";

import styled from "styled-components";

// redux
import { useSelector } from "react-redux";
import { setAngryChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function ThirdQuestion() {
    const [thirdAnswer, setThirdAnswer] = useState()
    const [emotionAnswer, setEmotionAnswer] = useState()
    const [happy, setHappy] = useState(false)
    const [sad, setSad] = useState(false)
    const [normal, setNormal] = useState(false)
    const [energytic, setEnergytic] = useState(false)

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
      setSad(!sad)
      if(!sad){
        setThirdAnswer("슬픈")
        dispatch(setAngryChoiceValue(1))
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickHappy = () => {
      setHappy(!happy)
      if(!happy){
        setThirdAnswer("기쁜")
        dispatch(setAngryChoiceValue(2))
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickEnergy = () => {
      setEnergytic(!energytic)
      if(!energytic){
        setThirdAnswer("에너지틱한")
        dispatch(setAngryChoiceValue(3))
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickNormal = () => {
      setNormal(!normal)
      if(!normal){
        setThirdAnswer("평온한")
        dispatch(setAngryChoiceValue(4))
      }else{
        setThirdAnswer("   ")
      }
    }

  return (
    <>
      <div className="signup-info-wrapper">
        {/* <div id="closedcontainer"> */}
        <SignupInfoBookcontainer>
          <div className="closed-book">
            <div className="first paper">
              <div className="page front contents">
                <div className="intro">
                  <h1>당신의 음악취향은?</h1>
                  <h2>3. 나는 화날 때 "{thirdAnswer}" 노래를 듣는다 </h2>
                  
                  <div className="first-row">
                    <div
                      className={sad ? "selected-box" : "question-box"}
                      onClick={onClickSad}
                    >
                      슬픈
                    </div>
                    <div
                      className={happy ? "selected-box" : "question-box"}
                      onClick={onClickHappy}
                    >
                      기쁜
                    </div>
                  </div>

                  <div className="second-row">
                    <div
                      className={energytic ? "selected-box" : "question-box"}
                      onClick={onClickEnergy}
                    >
                      에너지틱한
                    </div>
                    <div
                      className={normal ? "selected-box" : "question-box"}
                      onClick={onClickNormal}
                    >
                      평온한
                    </div>
                  </div>

                    <div className="next-btn">
                    <Button name="<- 이전" color="#AC5050" size="lg" onClick={onMoveBack} />
                     <Button name="다음->" color="#AC5050" size="lg" onClick={onMoveQuestionFour} />
                    </div>
                </div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>
        </SignupInfoBookcontainer>
        {/* </div> */}
      </div>
    </>
  );
}

export default ThirdQuestion;