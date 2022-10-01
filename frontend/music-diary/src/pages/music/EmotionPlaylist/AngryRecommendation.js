import MainNote from "../../mainpages/MainNote"
import { musicRecommend} from '../../../api/musicApi'
import { useEffect, useState } from "react"
import './AngryRecommendation.css'
import { useNavigate } from "react-router-dom"

const AngryRecommendation =() => {
    const [angryMusic, setAngryMusic] = useState([])
    const [youtube, setYoutube] = useState("")
    const navigate = useNavigate()
    
    // const [videoid, setVideoid] = useState('')

    useEffect(()=> {
        musicRecommend(4)
        .then((res)=> {
            // console.log(res.data)
            
            setAngryMusic(res.data)
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

    return(<div className="angry-recommendation">
        <div className="workarea">
            <div className="header" style={{marginTop:'6vh'}}>
                <h2>당신에게 추천합니다</h2>
                <p>화난 순간, 마음을 다스려줄 플레이리스트</p>
            </div>
            <div style={{display:"flex", marginLeft:"3vw"}}>
                
                <iframe src={youtube} title="YouTube video player" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen style={{width:"35vw", height:"40vh", marginTop:"5vh"}}></iframe>
                
                <div style={{marginLeft:"2vw", marginTop:'5.5vh'}}>
                    {angryMusic.map((it)=> 
                    <p style={{display:"flex", marginTop:"-1.3vh"}}
                    onClick={()=>{navigate({youtube})}}
                    >{it.track_name}</p>)}
                </div>
            </div>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default AngryRecommendation