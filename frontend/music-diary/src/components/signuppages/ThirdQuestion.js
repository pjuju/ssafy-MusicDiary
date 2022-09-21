import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css"
import Button from "../Common/Button";

import styled from "styled-components";

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`;

function ThirdQuestion() {
    const [thirdAnswer, setThirdAnswer] = useState()
    const [emotionAnswer, setEmotionAnswer] = useState()
    const [dance, setDance] = useState(false)
    const [sad, setSad] = useState(false)
    const [normal, setNormal] = useState(false)
    const [energytic, setEnergytic] = useState(false)

    const navigate = useNavigate()

    const onMoveQuestionFour = () =>{
        navigate('/signup/question/four')
    }
    const onMoveBack = ()=> {
      navigate('/signup/question/two')
    }

    const onClickDance = () => {
      setDance(!dance)
      if(!dance){
        setThirdAnswer("신나는")
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickSad = () => {
      setSad(!sad)
      if(!sad){
        setThirdAnswer("슬픈")
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickNormal = () => {
      setNormal(!normal)
      if(!normal){
        setThirdAnswer("평온한")
      }else{
        setThirdAnswer("   ")
      }
    }

    const onClickEnergy = () => {
      setEnergytic(!energytic)
      if(!energytic){
        setThirdAnswer("에너지틱한")
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
                    <div className={dance ? "selected-box" : "question-box"} onClick={onClickDance} >
                      신나는 노래
                    </div>
                    <div className={sad ? "selected-box" : "question-box"} onClick={onClickSad} >
                      슬픈노래
                    </div>
                  </div>
                  <div className="second-row">
                    <div className={normal ? "selected-box" : "question-box"} onClick={onClickNormal}>
                      평온한 노래
                    </div>
                    <div className={energytic ? "selected-box" : "question-box"} onClick={onClickEnergy}>
                      에너지틱한 노래
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