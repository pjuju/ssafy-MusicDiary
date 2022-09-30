import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNote from "../mainpages/MainNote";

import { ResponsiveRadar } from "@nivo/radar";
import Form from "react-bootstrap/Form";

import Button from "../../components/Common/Button";

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
import { getMonthDiary, getDiaryListApi, getDiaryImage } from "../../api/diaryApi";

import "./EditMyInfo.css";

function EditMyInfo() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Image
  const [returnImg, setReturnImg] = useState("");
  const [imgBase64, setImgBase64] = useState([]); // 미리보기를 구현할 state
  const [imgFile, setImgFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    `${process.env.PUBLIC_URL}/assets/img/default-img.png`
  );

  const navigate = useNavigate();

  const onChaneUserName = (e) => {
    console.log(e.target.value);

    setUserName(e.target.value);
  };

  const onChangePassword = (e) => {
    console.log(e.target.value);

    setPassword(e.target.value);
  };

  // 이미지 파일을 업로드하면, 실행될 함수
  const onHandleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);

    // 미리보기 state
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 파일을 읽어서 버퍼에 저장중

        // 파일 상태업데이트
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            // 변환해서 미리보기 이미지에 넣어주는 부분
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // 이미지 업로드 버튼 함수
  const onImgRegisterBtn = () => {
    const fd = new FormData();
    // imgFile의 파일들을 읽어와서, file이라는 이름으로 저장하기
    // -> FormData에 file이라는 이름의 파일 배열이 들어감
    Object.values(imgFile).forEach((file) => fd.append("image", file));

    getDiaryImage(fd)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setReturnImg(res.data)

        
      const profileImage = {
        image_url: res.data
      }

        const user_id = sessionStorage.getItem("user_id")

        patchUserInfoApi(profileImage, user_id)
        .then((res)=>{
          console.log(JSON.stringify(res.data))
  
          alert("프로필 사진 변경이 완료")
        })
        .catch((err)=>{
          console.log(err.data)
        })

        console.log("returnImg:", returnImg)
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      });                                           




    
  };

  const onEditBtn = () => {
    // session에서 userid
    const user_id = sessionStorage.getItem("user_id");
    // 수정할 정보
    const editInfo = {
      username,
      password,
    };

    // patch API
    patchUserInfoApi(editInfo, user_id)
      .then((res) => {
        console.log(res.data);

        // 수정완료 알람

        // 성공 시, 화면 전환
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.data);

        // 변경 실패 알림 띄우기

        // 1. 기존의 비밀번호와 같을 경우

        //
      });
  };

  const onQuitBtn = () => {
    // 진짜 회원탈퇴할건지 확인창

    // 탈퇴확인 시 처리
    const user_id = sessionStorage.getItem("user_id");
    deleteUserInfoApi(user_id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });

    // 취소할 시 처리
  };

  return (
    <>
      <div className="edit-myinfo">
        <div className="myinfo">
        <h2 className="edit-myinfo-title">나의 정보 수정</h2>
          <div className="myinfo-main">
            
            {/* 이미지 등록 */}
          <div className="edit-myinfo-profile">
            <div className="diary-img-wrapper">

              {imgFile === "" ? (
                <img className="diary-register-img" alt="#" src={previewUrl} />
              ) : null}
              {imgBase64.map((item) => {
                return (
                  <div>
                    <img
                      className="diary-register-img"
                      src={item}
                      alt="First Slide"
                    />
                  </div>
                );
              })}
            </div>

            <div className="diary-register-btn">
              <input
                multiple="multiple"
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={onHandleChangeFile}
                style={{ display: "none" }}
              />

              <label for="file">
                <div className="find-file-btn">파일찾기</div>
              </label>

              <Button
                className=" y"
                name="프로필 변경"
                style={{ width: "110px", fontSize: "15px", marginLeft: "20px" }}
                color="#AC5050"
                size="sm"
                onClick={onImgRegisterBtn}
              />
            </div>
          </div>

            {/* 닉네임, 비밀번호 수정 */}
          <div className="edit-myinfo-field">
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
              <div>
                <Button
                  className="edit-btn"
                  name="수정완료"
                  color="#AC5050"
                  size="sm"
                  onClick={onEditBtn}
                />
              </div>

              <div className="quit-btn">
                <Button
                  className="edit-btn"
                  name="회원탈퇴"
                  color="#464646"
                  size="sm"
                />
              </div>
            </div>
          </div>

          </div>
        </div>

        <MainNote className="main-note"></MainNote>
      </div>
    </>
  );
}

export default EditMyInfo;
