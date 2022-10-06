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
            <h1 style={{marginTop:'5vh'}}>My Playlist</h1>
            <h5 style={{marginTop:"0vh", color:"grey"}}>이런 날, 내가 좋아했던 노래는?</h5>
            <h5 style={{marginTop:"-1vh", color:"grey"}}>내가 좋아했던 노래를 감정별로 들어보세요.</h5>
        
            <div className="playlist">
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"6vh"}}>
                    <div className="happy animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/happyplaylist')}}>
                        <img src="/assets/img/happy_emoji.png" style={{width:"6vw", marginTop:'2vh'}}></img>
                        <h4>행복한 순간</h4>
                    </div>
                    <div className="sad animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/sadplaylist')}}>
                        <img src="/assets/img/sad_emoji.png" style={{width:"6vw", marginTop:'2vh'}}></img>
                        <h4>슬픈 순간</h4>
                    </div>
                    <div className="normal animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/calmplaylist')}}>
                        <img src="/assets/img/normal_emoji.png" style={{width:"6vw", marginTop:'-1vh'}}></img>
                        <h4>평온한 순간</h4>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"4vh" }}>
                    <div className="anxious animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/nervousplaylist')}}>
                        <img src="/assets/img/anxious_emoji.png" style={{width:"6vw", marginTop:'2vh'}}></img>
                        <h4>불안한 순간</h4>
                    </div>
                    <div className="depressed animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/depressplaylist')}}>
                        <img src="/assets/img/depressed_emoji.png" style={{width:"6vw", marginTop:'2vh'}}></img>
                        <h4>우울한 순간</h4>
                    </div>
                    <div className="angry animate__animated animate__bounceIn" style={{cursor: "pointer"}} onClick={()=>{navigate('/angryplaylist')}}>
                        <img src="/assets/img/angry_emoji.png" style={{width:"6vw", marginTop:'2vh'}}></img>
                        <h4>화난 순간</h4>
                    </div>
                </div>
            </div>

        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default MusicPlaylist;