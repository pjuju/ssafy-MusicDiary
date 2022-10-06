import React, { useEffect, useState } from 'react';

import './MainPlaylist.css'
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import { useSelector } from "react-redux";
import { setNormalChoiceValue } from "../../store/store";
import { useDispatch } from "react-redux";

import { getUserInfoApi } from '../../api/userApi'

import toggleClass from 'jquery'

import $ from 'jquery'

const MainPlaylist = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState("")
    const [userName, setUserName] = useState("");
    const [previewUrl, setPreviewUrl] = useState(
        `${process.env.PUBLIC_URL}/assets/img/default-img.png`
      );

    const [imageResult, setImageResult] = useState("");
    
    const storeUserName = useSelector((state)=>{
        return state.user.username
      })

    const onLogoutBtn = ()=>{
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        navigate('/')
    }

    const onMoveCalender = () =>{
        navigate('/calender')
    }
    
    useEffect(()=>{
        const user_id = sessionStorage.getItem("user_id")
        
        console.log("username:", storeUserName)

        getUserInfoApi(user_id)
        .then((res)=>{
            console.log("in MainNote:", JSON.stringify(res.data.data.image_url))

   
            setUserName(res.data.data.username)
            setUserImage(res.data.data.image_url)

        })
        .catch((err)=>{
            console.log(err.data)

        })
    }, [])
     
    return(<div className='main-note'>
        <div className='left-page'>
            <div style={{width:'100px',height:'100px',
            position:'absolute', 
            paddingTop:'2vh',marginTop:'15vh',marginLeft:'1.8vw'}}>
                {
                    userImage === "NULL" || userImage === "null" 
                    ? (
                        <img src={previewUrl} alt=""
                            className='profile-image'
                            style={{width:"7vw", marginTop:'0vh'}}
                        />
                    )
                    : (
                        <img src={"https:///"+ userImage} alt=""
                            className='profile-image'
                            style={{width:"7vw", marginTop:'0vh'}}
                        />
                    )
                }
            <h5 style={{color:"black"}}>{userName}</h5>

            </div>

        {/* {
            userImage === "NULL" || userImage === null 
            ? (
                <img src={previewUrl} alt=""
                    className='profile-image'
                    style={{width:"7vw"}}
                />
            )
            : (
                <img src={"https:///"+ userImage} alt=""
                    className='profile-image'
                    style={{width:"7vw"}}
                />
            )
        }

            <h5 style={{color:"black"}}>{userName}</h5> */}

            <div className='profile-menu'>
                <div className="menu-diary" onClick={()=>{navigate('/calender')}}>
                    일기장
                </div>

                <div className="menu-bookmark" onClick={()=>{navigate('/bookmarks')}}>
                    책갈피
                </div>

                <div className="menu-playlist" onClick={()=>{navigate('/myplaylist')}}>
                    My Playlist
                </div>

                <div className="menu-recommend" onClick={()=>{navigate('/musicrecommendation')}}>
                    음악 추천
                </div>

            </div>
        </div>
        <div className='bookmarks'>
            <div className='logout' onClick={onLogoutBtn}>로그아웃</div>
            <Dropdown className='my-page'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{fontSize:"20px", height:"5.3vh"}}>
                    마이 페이지
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={()=>{navigate('/mypage/edit')}}>회원정보 수정</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={()=>{navigate('/analysis')}}>나의 감정 분석</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={()=>{navigate('/mypage/mysticker')}}>나의 스티커</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
        <img src="/assets/img/new123.png" className='book-background'/>
    </div>)
}

export default MainPlaylist