// import MainNote from "../mainpages/MainNote"
// import './MyPlaylist.css'
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getUserInfoApi } from '../../api/userApi'
// import { likeList } from '../../api/musicApi';
// import { useParams } from "react-router-dom";
// import { emotionMusic} from '../../api/musicApi'

// const MyPlaylist = () => {

//     const user_id = sessionStorage.getItem("user_id")

//     // 좋아하는 음악 플리 받아오기
//     const [myData, setMyData] = useState([])
//     const [username, setUsername] = useState('')
//     const [myFavoriteMusic, setMyFavoriteMusic] = useState([])
//     useEffect(()=> {
//         getUserInfoApi(user_id)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setMyData(res.data)
//             setMyFavoriteMusic(res.data.data.favorite_musics)
//             setUsername(res.data.data.username)
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])
//     console.log(myFavoriteMusic)

//     // 감정별 플리 받아오기
//     // 행복
//     const [happyPlaylist, setHappyPlaylist ] = useState([])
//     useEffect(()=> {
//         emotionMusic(1)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setHappyPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])

//     // 불안
//     const [calmPlaylist, setCalmPlaylist] = useState([])
//     useEffect(()=> {
//         emotionMusic(2)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setCalmPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])

//     // 슬픔
//     const [sadPlaylist, setSadPlaylist] = useState([])
//     useEffect(()=> {
//         emotionMusic(3)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setSadPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])

//     // 분노
//     const [angryPlaylist, setAngryPlaylist] = useState([])
//     useEffect(()=> {
//         emotionMusic(4)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setAngryPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])  

//     // 우울
//     const [depressedPlaylist, setDepressedPlaylist] = useState([])
//     useEffect(()=> {
//         emotionMusic(5)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setDepressedPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])  

//     // 평온
//     const [normalPlaylist, setNormalPlaylist] = useState([])
//     useEffect(()=> {
//         emotionMusic(6)
//         .then((res)=> {
//             console.log(JSON.stringify(res.data))
//             setNormalPlaylist(JSON.stringify(res.data))
//         })
//         .catch((err)=> {
//             console.log(err)
//         })
//     },[])  

//     return(<div className="my-playlist">
//         <div className="work-area">
//             <h2 className="title">{username}님의 플레이리스트</h2>
//             <div className="playlist">
//                 <div className=""></div>

//             </div>
//         </div>
//         <MainNote className="main-note"></MainNote>
//     </div>)
// } 

// export default MyPlaylist
import MainNote from "../mainpages/MainNote"
import './MyPlaylist.css'
import { emotionMusic } from '../../api/musicApi'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const MusicPlaylist = () => {
    const navigate = useNavigate();
    const [happyPlaylist, setHappyPlaylist] = useState([])
    const [calmPlaylist, setCalmPlaylist] = useState([])
    const [sadPlaylist, setSadPlaylist] = useState([])
    const [angryPlaylist, setAngryPlaylist] = useState([])
    const [depressedPlaylist, setDepressedPlaylist]= useState([])
    const [normalPlaylist, setNormalPlaylist] = useState([])


    useEffect(()=> {
        emotionMusic(1)
        .then((res)=> {
            console.log(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    return(<div className="music-playlist">
        <div className="work-area">
            <h2 style={{marginTop:'5vh'}}>플레이리스트 추천</h2>
            <p>그날 그날 바뀌는 나의 감정, 다르게 음악을 추천받을 수 없을까?</p>
            <p style={{marginTop:"-3vh"}}>순간의 감정에 어울리는 음악을 추천받아 보세요</p>
        
            <div className="playlist">
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"6vh"}}>
                    <div className="happy animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/happyplaylist')}}>
                        <img src="/assets/img/happy_emoji.png" style={{width:"7vw", marginTop:'2vh'}}></img>
                        <h5>행복한 순간</h5>
                    </div>
                    <div className="sad animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/sadplaylist')}}>
                        <img src="/assets/img/sad_emoji.png" style={{width:"7vw", marginTop:'2vh'}}></img>
                        <h5>슬픈 순간</h5>
                    </div>
                    <div className="normal animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/calmplaylist')}}>
                        <img src="/assets/img/normal_emoji.png" style={{width:"7vw", marginTop:'-1vh'}}></img>
                        <h5>평온한 순간</h5>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"4vh" }}>
                    <div className="anxious animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/nervousplaylist')}}>
                        <img src="/assets/img/anxious_emoji.png" style={{width:"7vw", marginTop:'2vh'}}></img>
                        <h5>불안한 순간</h5>
                    </div>
                    <div className="depressed animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/depressplaylist')}}>
                        <img src="/assets/img/depressed_emoji.png" style={{width:"7vw", marginTop:'2vh'}}></img>
                        <h5>우울한 순간</h5>
                    </div>
                    <div className="angry animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/angryplaylist')}}>
                        <img src="/assets/img/angry_emoji.png" style={{width:"7vw", marginTop:'2vh'}}></img>
                        <h5>화난 순간</h5>
                    </div>
                </div>
            </div>

        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default MusicPlaylist;