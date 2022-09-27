import MainNote from "../mainpages/MainNote"
import './MusicRecommendation.css'

const MusicRecommendation = () => {
    return(<div className="music-recommendation">
        <div className="work-area">
            <h2>이 곳은 음악추천 페이지!!!!</h2>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default MusicRecommendation