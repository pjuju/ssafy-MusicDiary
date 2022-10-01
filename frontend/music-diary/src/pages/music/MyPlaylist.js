import MainNote from "../mainpages/MainNote"
import './MyPlaylist.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfoApi } from '../../api/userApi'
import { likeList } from '../../api/musicApi';
import { useParams } from "react-router-dom";
import { emotionMusic} from '../../api/musicApi'

const MyPlaylist = () => {

    const user_id = sessionStorage.getItem("user_id")

    // 좋아하는 음악 플리 받아오기
    const [myData, setMyData] = useState([])
    const [username, setUsername] = useState('')
    const [myFavoriteMusic, setMyFavoriteMusic] = useState([])
    useEffect(()=> {
        getUserInfoApi(user_id)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setMyData(res.data)
            setMyFavoriteMusic(res.data.data.favorite_musics)
            setUsername(res.data.data.username)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])
    console.log(myFavoriteMusic)

    // 감정별 플리 받아오기
    // 행복
    const [happyPlaylist, setHappyPlaylist ] = useState([])
    useEffect(()=> {
        emotionMusic(1)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setHappyPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    // 불안
    const [calmPlaylist, setCalmPlaylist] = useState([])
    useEffect(()=> {
        emotionMusic(2)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setCalmPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    // 슬픔
    const [sadPlaylist, setSadPlaylist] = useState([])
    useEffect(()=> {
        emotionMusic(3)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setSadPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    // 분노
    const [angryPlaylist, setAngryPlaylist] = useState([])
    useEffect(()=> {
        emotionMusic(4)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setAngryPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])  

    // 우울
    const [depressedPlaylist, setDepressedPlaylist] = useState([])
    useEffect(()=> {
        emotionMusic(5)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setDepressedPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])  

    // 평온
    const [normalPlaylist, setNormalPlaylist] = useState([])
    useEffect(()=> {
        emotionMusic(6)
        .then((res)=> {
            console.log(JSON.stringify(res.data))
            setNormalPlaylist(JSON.stringify(res.data))
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])  

    return(<div className="my-playlist">
        <div className="work-area">
            <h2 className="title">{username}님의 플레이리스트</h2>
            <div className="playlist">
                <div className=""></div>

            </div>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
} 

export default MyPlaylist