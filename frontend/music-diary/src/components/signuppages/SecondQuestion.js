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

function SecondQuestion() {
    const [secondAnswer, setSecondAnswer] = useState()
    const [emotionAnswer, setEmotionAnswer] = useState()
    const [dance, setDance] = useState(false)
    const [sad, setSad] = useState(false)
    const [normal, setNormal] = useState(false)
    const [energytic, setEnergytic] = useState(false)

    const navigate = useNavigate()

    const onMoveQuestionTwo = () =>{
        navigate('/signup/question/three')
    }

    const onClickDance = () => {
      setDance(!dance)
      if(!dance){
        setSecondAnswer("신나는")
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickSad = () => {
      setSad(!sad)
      if(!sad){
        setSecondAnswer("슬픈")
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickNormal = () => {
      setNormal(!normal)
      if(!normal){
        setSecondAnswer("평온한")
      }else{
        setSecondAnswer("   ")
      }
    }

    const onClickEnergy = () => {
      setEnergytic(!energytic)
      if(!energytic){
        setSecondAnswer("에너지틱한")
      }else{
        setSecondAnswer("   ")
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
                  <h2>나는 평소에 "{secondAnswer}" 노래를 듣는다 </h2>
                  
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
                     <Button name="다음->" color="#AC5050" size="lg" onClick={onMoveQuestionTwo} />
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

export default SecondQuestion;