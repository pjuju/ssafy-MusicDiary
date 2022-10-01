import api from './api'

// 음악 좋아요(POST)///////////////////////////// API는.. 된듯..?
export const makeLike = async(music_id, success, fail) => {
    return await api.post(`/music/like/${music_id}/`)
}

// 음악 좋아요 리스트(GET)//////////////////////////////////
export const likeList = async(success, fail) => {
    return await api.get(`/music/like/`)
}

// 음악 추천(GET)//////////////////////////////////
export const musicRecommend = async(emotion_id, success, fail) => {
    return await api.get(`/music/playlist/recommend/${emotion_id}/`)
}

// 감정별 음악 리스트(GET)//////////////////////////////////
export const emotionMusic = async(emotion_id, success, fail) => {
    return await api.get(`/music/playlist/${emotion_id}/`)
}

// 음악(GET)//////////////////////////////////
export const getMusic = async(music_id, success, fail) => {
    return await api.get(`/music/${music_id}/`)
}