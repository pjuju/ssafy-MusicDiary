import api from './api'

// 일기 작성(POST) API / HTML
export const writeDiaryListApi = async(diaryInfo, success, fail) => {
    console.log(diaryInfo)
    return await api.post('/diary/', diaryInfo)
}
 
// 일기 전체 리스트 보기(GET) X
export const getDiaryListApi = async(diariesInfo,success, fail) => {
    return await api.get('/diary/', diariesInfo)
}

// 책갈피 전체 리스트 보기(GET) /////////////////////////
export const getBookmarkList = async(bookmarkList,success, fail) => {
    return await api.get('/diary/boookmark/', bookmarkList)
}

// 일기 상세 보기(GET) API / HTML
export const getDetailDiary = async(diary_id, success, fail) => {
    return await api.get(`/diary/${diary_id}/`, diary_id)
}

// 일기 수정(PUT) X
export const modifyDiary = async(diary_id, diaryInfo, success, fail) => {
    return await api.get(`/diary/${diary_id}/`, diary_id)
}

// 일기 개별 수정(PATCH) API / HTML
export const modifyDiaryItem = async(diary_id,diaryInfo, success, fail ) => {
    return await api.patch(`/diary/${diary_id}/`,diaryInfo)
}

// 일기 삭제(DELETE) API / HTML
export const deleteDiary = async(diary_id, success, fail) => {
    return await api.delete(`/diary/${diary_id}/`)
}

// 책갈피 등록(POST)///////////////////////////// API는.. 된듯..?
export const makeBookmark = async(diary_id, success, fail) => {
    return await api.post(`/diary/${diary_id}/bookmark/`)
}

// 책갈피 해제(DELETE)//////////////////////////////////
export const deleteBookmark = async(diary_id, success, fail) => {
    return await api.delete(`/diary/${diary_id}/bookmark/`)
}

// 일기별 플레이리스트 생성(POST) X
export const makePlaylist = async(diary_id, success, fail) => {
    return await api.post(`/diary/${diary_id}/playlist`)
}

// 일기별 플레이리스트 조회(GET) X
export const getPlaylist = async(diary_id, success, fail) => {
    return await api.get(`/diary/${diary_id}/playlist`)
}

// 월별 일기 감정 조회(GET) API 완성 / HTML
export const getMonthEmotion = async(month, success, fail) => {
    return await api.get(`/diary/month/${month}/emotion/`)
}

// 월별 일기 모아보기(GET) API 완성 / HTML
export const getMonthDiary = async(month, success, fail) => {
    return await api.get(`/diary/month/${month}/`)
}