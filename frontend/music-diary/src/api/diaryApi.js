import api from './api'

// 일기 작성(POST)
export const writeDiaryListApi = async(diaryInfo, success, fail) => {
    return await api.post('/diary/', diaryInfo)
}

// 일기 전체 리스트 보기(GET)
export const getDiaryListApi = async(success, fail) => {
    return await api.get('/diary/')
}

// 책갈피 전체 리스트 보기(GET)
export const getBookmarkList = async(success, fail) => {
    return await api.get('/diary/boookmark')
}

// 일기 상세 보기(GET)
export const getDetailDiary = async(diary_id, success, fail) => {
    return await api.get(`/diary/${diary_id}`)
}

// 일기 수정(PUT)
export const modifyDiary = async(diary_id, success, fail) => {
    return await api.get(`/diary/${diary_id}`)
}

// 일기 개별 수정(PATCH)
export const modifyDiaryItem = async(diary_id, success, fail ) => {
    return await api.patch(`/diary/${diary_id}`)
}

// 일기 삭제(DELETE)
export const deleteDiary = async(diary_id, success, fail) => {
    return await api.delete(`/diary/${diary_id}`)
}

// 책갈피 등록(POST)
export const makeBookmark = async(diary_id, success, fail) => {
    return await api.post(`/diary/${diary_id}/bookmark`)
}

// 책갈피 해제(DELETE)
export const deleteBookmark = async(diary_id, success, fail) => {
    return await api.delete(`/diary/${diary_id}/bookmark`)
}

// 일기별 플레이리스트 생성(POST)
export const makePlaylist = async(diary_id, success, fail) => {
    return await api.post(`/diary/${diary_id}/playlist`)
}

// 일기별 플레이리스트 조회(GET)
export const getPlaylist = async(diary_id, success, fail) => {
    return await api.get(`/diary/${diary_id}/playlist`)
}

// 월별 일기 감정 조회(GET)
export const getMonthEmotion = async(month, success, fail) => {
    return await api.get(`/diary/month/${month}/emotion`)
}

// 월별 일기 모아보기(GET)
export const getMonthDiary = async(month, success, fail) => {
    return await api.get(`/diary/month/${month}`)
}