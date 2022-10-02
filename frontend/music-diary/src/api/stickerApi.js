import api from './api'


// DB에 저장된 모든 스티커팩 전체를 조회
export const getTotalStickerListApi = async( success, fail) => {
    return await api.get('/sticker/pack/')
}


// 사용자가 보유한 스티커팩 조회 
export const getUserStickerListApi = async (user_id, succes, fail) => {
    console.log("userId:", user_id)
    return await api.get(`/sticker/user/${user_id}/`) 
}


// sticker_id로 해당 스티커팩 조회 
export const getStickerListApi = async ( stickerpack_id, success, fail) => {
    return await api.get(`/sticker/pack/${stickerpack_id}/`)
} 


// 스티커팩 구매
export const buyStickerPackApi = async (stickerpack_id, success, fail) => {
    return await api.post(`/sticker/${stickerpack_id}/`)
}

