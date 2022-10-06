import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

import "../../css/signuppages/SignupPageBook.css"
// import Button from '../Common/Button'

import styled from 'styled-components'
import { signUpApi } from "../../api/userApi";

import axios from 'axios'
// redux store 
import { useSelector } from "react-redux";
import { setUserEmail, setUserPassword, setUserPassword2, setUserName} from '../../store/store'
import { useDispatch } from "react-redux";

// etc 
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form'


function SignupInfo() {
  
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  //******************************************************** */
  // 폼을 만들기 위한 여러가지 요소 불러오기
  const { register, handleSubmit, getValues } = useForm();

  // 데이터 전송시 작동할 함수 정의
  const onValid = (data) => {
    // 기본으로 data 가져오기
    console.log(data)
    
    // getValues()로 data 가져오기
    const { name, firstName } = getValues();
  }
  //******************************************************** */
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const onEmailHandler = (e) => {
    setEmail(e.target.value)
  }
  
  const onUsernameHandler = (e) => {
    console.log("on Username Handler:", e.target.value)
    setUsername(e.target.value)
  }
  
  const onPasswordHandler = (e) => {
    setPassword(e.target.value)
  }
  
  const onPassword2Handler = (e) => {
    setPassword2(e.target.value)
  }

  // 다음 설문조사로 이동
  const moveQuestionOne = () => {

    dispatch(setUserEmail(email))
    dispatch(setUserName(username))
    dispatch(setUserPassword(password))
    dispatch(setUserPassword2(password2))
    
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

      Swal.fire({
        icon: 'success',
        title: '회원가입 성공! 로그인페이지로 이동합니다',
        showConfirmButton: false,
        timer: 1300
      })

      navigate('/')
    })
    .catch((err)=>{
      console.log(err.data)
    })
  }

  const storeEmail = useSelector((state)=>{
    return state.user.email
  })

  const storeUserName = useSelector((state=>{
    return state.user.username
  }))

  return (
    <>  
      <div className="signup-info-wrapper" style={{position:'relative'}}>
          <div className='signup-info'>

 
            <div style={{marginTop:'5vh'}}>
              <h5 style={{color:'#3D3D3D',marginLeft:'-14vw'}}>이메일 주소</h5>
              <input 
                className='email-input'
                placeholder="Email address"
                name='email'
                type='email'
                onChange={onEmailHandler}
            />
            </div>

            <div>
              <h5 style={{color:'#3D3D3D',marginLeft:'-16vw',marginTop:'2vh'}}>닉네임</h5>
              <input 
                className='nickname-input'
                placeholder="Nickname"
                name='username'
                type='text'
                onChange={onUsernameHandler}
              />
            </div>

          <div>
            <h5 style={{color:'#3D3D3D',marginLeft:'-15.5vw',marginTop:'2vh'}}>비밀번호</h5>
            <input 
              className='password-1'
              placeholder="Password"
              name='password'
              type='password'
              onChange={onPasswordHandler}
            />
          </div>

          <div>
            <h5 style={{color:'#3D3D3D',marginLeft:'-13vw',marginTop:'2vh'}}>비밀번호 확인</h5>
            <input 
              className='password-2'
              placeholder="Confirm Password"
              name='password2'
              type='password'
              onChange={onPassword2Handler}
            />
            </div>

          </div>
          {/* signup-info : end */}

            <button className='survey-btn' onClick={moveQuestionOne}>설문조사 시작</button>
            <h5  className='back-btn'onClick={()=>{navigate('/')}}>돌아가기</h5>
          </div>
        <img src="/assets/img/signup.png" style={{width:'100vw',height:'100vh'}}></img>
    </>
  )
}

export default SignupInfo