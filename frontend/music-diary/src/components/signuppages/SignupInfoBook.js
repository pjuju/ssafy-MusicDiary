import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css"
import Button from '../Common/Button'

import styled from 'styled-components'
import { signUpApi } from "../../api/userApi";

import axios from 'axios'

const SignupInfoBookcontainer = styled.div`
  width: 60%;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
`

function SignupInfoBook() {
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  const navigate = useNavigate()

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  
  const onUsernameHandler = (e) => {
    setUsername(e.target.value)
  }
  
  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  
  const onPassword2Handler = (e) => {
    setPassword2(e.target.value)
  }

  const moveQuestionOne = () => {


    
    navigate('/signup/question/one')
  }

  const onSignUpBtn = () => {
    const userInfo = {
      email, 
      password,
      password2,
      username,
      sad:1,
      angry:1,
      depressed:1,
      normal:1,
      point:1,
      image_url:"null"

    }

    axios
    .post("http://j7d204.p.ssafy.io:8080/rest/accounts/signup/", userInfo)
    .then((res)=>{
      console.log(JSON.stringify(res.data))

      alert("회원가입 성공! 로그인페이지로 이동합니다")

      navigate('/')
    })
    .catch((err)=>{
      console.log(err.data)
    })

    // signUpApi(userInfo)
    // .then((res)=>{
    //   console.log(JSON.stringify(res.data))

      

    // })
    // .catch((err)=>{
    //   console.log(JSON.stringify(err.data))


    // })

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
                <h1>회원가입</h1>
                <div className="signup-form-wrapper">
                <input 
                  placeholder="이메일"
                  name='email'
                  type='email'
                  onChange={onEmailHandler}
                />
                <input 
                  placeholder="닉네임"
                  name='username'
                  type='text'
                  onChange={onUsernameHandler}
                />
                <input 
                  placeholder="비밀번호"
                  name='password'
                  type='password'
                  onChange={onPasswordHandler}
                />
                <input 
                  placeholder="비밀번호 확인"
                  name='password2'
                  type='password'
                  onChange={onPassword2Handler}
                />
                </div>
                <div className="next-btn">
                <Button 
                  name="다음->"
                  color="#AC5050"
                  size="lg"
                  // onClick={onSignUpBtn}
                  onClick={moveQuestionOne}
                />
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
  )
}

export default SignupInfoBook