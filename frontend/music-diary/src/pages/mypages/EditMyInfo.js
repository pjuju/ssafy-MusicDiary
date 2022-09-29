import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNote from "../mainpages/MainNote";

import { ResponsiveRadar } from "@nivo/radar";
import Form from "react-bootstrap/Form";

import Button from '../../components/Common/Button'

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
import { patchUserInfoApi, deleteUserInfoApi } from "../../api/userApi";
import {getMonthDiary,getDiaryListApi } from '../../api/diaryApi';


import "./EditMyInfo.css";

function EditMyInfo() {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const onChaneUserName = (e)=> {
    console.log(e.target.value)

    setUserName(e.target.value)
  } 

  const onChangePassword = (e)=> {
    console.log(e.target.value)

    setPassword(e.target.value)
  }

  const onEditBtn=()=>{
    // session에서 userid 
    const user_id = sessionStorage.getItem("user_id")
    // 수정할 정보 
    const editInfo = {
      username,
      password,
    }

    // patch API 
    patchUserInfoApi(editInfo, user_id)
    .then((res)=>{
      console.log(res.data)

      // 수정완료 알람

      // 성공 시, 화면 전환
      navigate('/login')
      

    })
    .catch((err)=>{
      console.log(err.data)

      // 변경 실패 알림 띄우기
      
      // 1. 기존의 비밀번호와 같을 경우 

      // 

    })
  }

  const onQuitBtn = ()=>{

    // 진짜 회원탈퇴할건지 확인창 

      // 탈퇴확인 시 처리
      const user_id = sessionStorage.getItem("user_id")
      deleteUserInfoApi(user_id)
      .then((res)=>{
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err.data)
      })

      // 취소할 시 처리 


  }



  return (
    <>
    <div className="edit-myinfo">
        <div className="myinfo">

            <div className="myinfo-main">
                <h2 className="edit-myinfo-title">나의 정보 수정</h2>

                <div className="edit-myinfo-input">
                    <input
                      className="edit-form-input"
                      placeholder="닉네임"
                      name="username"
                      type="text"
                      onChange={onChaneUserName}
                    />
                    <input
                      className="edit-form-input"
                      placeholder="비밀번호"
                      name="password"
                      type="password"
                      onChange={onChangePassword}
                    />
                </div>
              
              <div className="edit-btn-wrapper">
                <div >
                  <Button className="edit-btn" name="수정완료" color="#AC5050" size="sm" onClick={onEditBtn} />
                </div>

                <div className="quit-btn">
                  <Button className="edit-btn" name="회원탈퇴" color="#464646" size="sm" />
                </div>
              </div>

            </div>     
        </div>


        <MainNote className="main-note"></MainNote>
    </div>
    </>
  )
}

export default EditMyInfo