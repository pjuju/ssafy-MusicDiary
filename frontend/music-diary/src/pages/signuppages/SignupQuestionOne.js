import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import "../../css/signuppages/SignupPageBook.css";
import "../../css/signuppages/QuestionBox.css";
// redux 확인중
import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

function SignupQuestionOne() {

  const [firstAnswer, setFirstAnswer] = useState();
  const [emotionAnswer, setEmotionAnswer] = useState();
  const [happy, setHappy] = useState(false);
  const [sad, setSad] = useState(false);
  const [normal, setNormal] = useState(false);
  const [energytic, setEnergytic] = useState(false);

  const navigate = useNavigate();

  // store의 state 값 확인중
  const storeEmail = useSelector((state) => {
    return state.user.normalChoice;
  });

  // store의 state바꾸기
  const dispatch = useDispatch();

  const onMoveQuestionTwo = () => {
    navigate("/signup/question/two");
  };

  // 슬픈 / 기쁜 / 에너지틱 / 평온한 노래 선택 -> dispatch
  const onClickSad = () => {
    setSad(!sad);
    if (!sad) {
      setFirstAnswer("슬픈");
      dispatch(setNormalChoiceValue(1));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickHappy = () => {
    setHappy(!happy);
    if (!happy) {
      setFirstAnswer("기쁜");
      dispatch(setNormalChoiceValue(2));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickEnergy = () => {
    setEnergytic(!energytic);
    if (!energytic) {
      setFirstAnswer("에너지틱한");
      dispatch(setNormalChoiceValue(3));
    } else {
      setFirstAnswer("   ");
    }
  };

  const onClickNormal = () => {
    setNormal(!normal);
    if (!normal) {
      setFirstAnswer("평온한");
      dispatch(setNormalChoiceValue(4));
    } else {
      setFirstAnswer("   ");
    }
  };




  return (
    <>
      <div style={{position:'relative'}}>
            <div style={{position:'absolute',width:'45vw',height:'70vh',marginTop:'20vh',marginLeft:'30vw'}}>
              <div>
                <div style={{color:'black'}}>
                  <h3 style={{marginTop:'5vh'}}>당신의 음악취향은?</h3>
                  <h3>
                    1. 나는 평소에 
                    <div style={{width:'8vw',height:'5vh',marginLeft:'19vw',backgroundColor:'#C1D3C2',borderRadius:'5px'}}>
                    {firstAnswer}
                    </div>
                    노래를 듣는다
                  </h3>

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
                      className={energytic ? "selected-e-box" : "question-e-box"}
                      onClick={onClickEnergy}
                    >에너지틱한</div>
                    <div
                      className={normal ? "selected-n-box" : "question-n-box"}
                      onClick={onClickNormal}
                    >
                      평온한
                    </div>
                  </div>
                  
                    <button
                      onClick={onMoveQuestionTwo}
                      className="next-button"
                    >다음</button>

                </div>
              </div>
            </div>
            <div className="shadow"></div>
          </div>

      <img src="/assets/img/signup.png" style={{width:'100vw',height:'100vh'}}></img>
    </>
  );
}

export default SignupQuestionOne;
