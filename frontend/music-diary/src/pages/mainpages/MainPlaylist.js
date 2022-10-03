import React, { useEffect, useState } from 'react';

import './MainPlaylist.css'
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

import { getUserInfoApi } from '../../api/userApi'

const MainPlaylist = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState("")
    
    const storeUserName = useSelector((state)=>{
        return state.user.username
      })

    const onLogoutBtn = ()=>{
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        navigate('/')
    }

    useEffect(()=>{
        const user_id = sessionStorage.getItem("user_id")

        getUserInfoApi(user_id)
        .then((res)=>{
            // console.log("in MainNote:", JSON.stringify(res.data.data.image_url))

            setUserImage(res.data.data.image_url)
        })
        .catch((err)=>{
            console.log(err.data)

        })
    })
    
    return(<div className='main-playlist'>
        <div className='left-page'>

            <img src={"https:///"+ userImage} alt="sq-sample14"
                className='profile-image'
                style={{width:"7vw"}}
            />

            <h5>{storeUserName}</h5>

            <div className='profile-menu' >
                <ul class="snip1250" onClick={()=>{navigate('/calender')}}>
                    <li><a href="#" data-hover="일기장">일기장</a></li>
                </ul>
                <ul class="snip1250" onClick={()=>{navigate('/bookmarks')}}>
                    <li ><a href="#" data-hover="책갈피">책갈피</a></li>
                </ul>
                <ul class="snip1250" onClick={()=>{navigate('/myplaylist')}}>
                    <li><a href="#" data-hover="My playlist">My playlist</a></li>
                </ul>
                <ul class="snip1250" onClick={()=>{navigate('/musicrecommendation')}}>
                    <li><a href="#" data-hover="음악 추천">음악 추천</a></li>
                </ul>
            </div>
        </div>
        <div className='bookmarks'>
            <div className='logout' onClick={onLogoutBtn}>로그아웃</div>
            <Dropdown className='my-page'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    마이 페이지
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={()=>{navigate('/mypage/edit')}}>회원정보 수정</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{navigate('/analysis')}}>나의 감정 분석</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={()=>{navigate('/mypage/mysticker')}}>나의 스티커</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
        <img src="/assets/img/playlist1.png" className='playlist-background'/>
    </div>)
}

export default MainPlaylist