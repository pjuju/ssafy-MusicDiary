import MainNote from "../../mainpages/MainNote"
import { musicRecommend, getMusic, makeLike } from '../../../api/musicApi'
import { getUserApi } from '../../../api/userApi'
import { useEffect, useState } from "react"
import './AnxiousRecommendation.css'
import { useNavigate } from "react-router-dom"

const DepressedRecommendation =() => {
    const [DepressedMusic, setDepressedMusic] = useState([])
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
    
    const likeCheck = (music_id) => {
        const txt = document.getElementById("heart"+music_id);
        getMusic(music_id)
        .then((res) => {
            if(res.data.like_users.includes(user)==="true"){
                txt.innerText = "♥";
            } else{
                txt.innerText = "♡";
            }
        })
        .catch((e) => {
            console.log("err", e);
        });
    }

    useEffect(()=> {
        musicRecommend(5)
        .then((res)=> {
            // console.log(res.data)
            
            setDepressedMusic(res.data)
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
        <div className="workarea">
            <div className="header" style={{marginTop:'6vh'}}>
                <h2>당신에게 추천합니다</h2>
                <p>우울한 순간, 당신의 곁에 있어줄 플레이리스트</p>
            </div>
            <div style={{display:"flex", marginLeft:"3vw"}}>
                
                <iframe src={youtube} title="YouTube video player" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen style={{width:"35vw", height:"40vh", marginTop:"5vh"}}></iframe>
                
                <div style={{marginLeft:"2vw", marginTop:'5.5vh'}}>
                    {DepressedMusic.map((it)=> 
                    <div>
                        {likeCheck(it.id)}
                        <h id={"heart"+it.id} style={{zIndex:"9999999999999999999999", display:"inline-block", marginTop:"-1.3vh", cursor: "pointer"}} onClick = {()=>likeMusic(it.id)}></h>
                        <p style={{display:"inline-block", marginTop:"-1.3vh"}}
                        onClick={()=>{navigate({youtube})}}
                        >{it.track_name}</p><br></br>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default DepressedRecommendation