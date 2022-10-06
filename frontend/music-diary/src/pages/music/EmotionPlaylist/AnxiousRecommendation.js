import MainPlaylist from "../../mainpages/MainPlaylist"
import { musicRecommend, makeLike } from '../../../api/musicApi'
import { getUserApi } from '../../../api/userApi'
import { useEffect, useState } from "react"
import './AnxiousRecommendation.css'
import { useNavigate } from "react-router-dom"
import { FcMusic } from 'react-icons/fc';

const AnxiousRecommendation =() => {
    const [anxiousMusic, setAnxiousMusic] = useState([])
    const [youtube, setYoutube] = useState("")
    const navigate = useNavigate()
    const [ user, setUser ] = useState("")
    
    // const [videoid, setVideoid] = useState('')

    getUserApi()
    .then((res) => {
        setUser(res.pk);
    })
    .catch((err)=> {
        console.log(err) 
    })
    
    const likeMusic = (music_id) => {
        const txt = document.getElementById("heart"+music_id);
        if (txt.innerText === "♥"){
          txt.innerText = "♡";
        }else{
          txt.innerText = "♥";
        }
        makeLike(music_id)
        
        .then((res) => {
        })
        .catch((e) => {
          console.log("err", e);
        });
      }

    const remakePlaylist = () => {
        musicRecommend(2)
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => {
          console.log("err", e);
        });
      }

    useEffect(()=> {
        musicRecommend(2)
        .then((res)=> {
            // console.log(res.data)
            
            setAnxiousMusic(res.data)
            let video = "";
            for (let i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {

                video += (res.data[i].videoid + ",");

                // setVideoid(res.data[i].videoid)
                // setYoutube("https://www.youtube.com/embed?playlist="+res.data[i].videoid.slice(0,-1))
                // console.log(videoid)
            }
            setYoutube("https://www.youtube.com/embed?playlist="+video.slice(0,-1));
        })
        .catch((err)=> {
            console.log(err) 
        })
    },[])
    console.log('유튜브 주소',youtube)

    
    // console.log('화난 순간 음악', angryMusic.map((it)=> it.track_name))
    // const trackName = angryMusic.map((it)=> it.track_name)

    return(<div className="anxious-recommendation">
        <div className="work-area">
            <div className="header">
                <h1 style={{marginTop:"10vh"}}>당신에게 추천합니다</h1>
                <h5 style={{fontSize:"18pt"}}>불안한 순간, 평안하게 들어볼 플레이리스트</h5>
            </div>
            <iframe src={youtube} className="playlist-iframe" title="YouTube video player" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
                
                <div className="remake-btn" onClick = {()=>remakePlaylist()}>
                        <img style={{width:"1.2vw", marginTop:"0.5vh"}} alt="" src="/assets/icons/syncro.png" />
                    </div>
                <div className="detail-diary-playlist">
                    
                    {anxiousMusic.map((it)=>
                    <div>
                    <div className="heart-wrapper">
                        <div id={"heart"+it.id} style={{zIndex:"9999999999999999999999", cursor: "pointer", color:"red"}} onClick = {()=>likeMusic(it.id)}>♡</div>
                        <div className="music-name-wrapper" onClick={()=>{navigate({youtube})}}>{it.track_name}</div><br></br>
                    </div>
                    <div className="artist-wrapper">
                        <div>{it.artist_name} <FcMusic style={{marginTop:"-0.5vh"}} /></div>
                      </div>
                    </div>
                    )}
            </div>
        </div>
        <MainPlaylist className="main-playlist"></MainPlaylist>
    </div>)
}

export default AnxiousRecommendation