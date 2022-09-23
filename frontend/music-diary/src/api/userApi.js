import api from './api'


export const signUpApi = async (userInfo, success, fail) => {
    console.log("in signUpApi:", JSON.stringify(userInfo))
    return await api.post("/accounts/signup/", userInfo)
  };

export const loginApi = async (userInfo, success, fail) => {
    console.log("in API:", JSON.stringify(userInfo))
    return await api.post('/accounts/login/', userInfo)
}


//  카카오 로그인
export const kakaoLoginApi = async(success, fail) => {
    return await api.post('/accounts/kakao/login/')
}

//  구글
export const googleLoginApi = async(success, fail) => {
    return await api.post('/accounts/google/login/')
}


// 회원정보 가져오기
export const getUserInfoApi = async (user_id, success, fail) => {
    return await api.get(`/accounts/${user_id}/`)
  }


//   전체 정보 수정
export const putUserInfoApi = async (userInfo, user_id, success, fail) => {
    return await api
      .put(`/accounts/${user_id}/`, userInfo, {
        header: {
          "Content-Type": `application/json`,
        },
      })
    //   .then(success)
    //   .catch(fail);
  };

//  일부정보 수정
  export const patchUserInfoApi = async (userInfo, username, success, fail) => {
    return await api
      .put(`/accounts/${username}/`, userInfo, {
        header: {
          "Content-Type": `application/json`,
        },
      })
    //   .then(success)
    //   .catch(fail);
  };


// 회원탈퇴
export const deleteUserInfoApi = async(user_id, success, fail) => {
    return await api.delete(`/accounts/${user_id}`)
}

// 기간별 감정 정보 가져오기
export const getEmotionInfoApi = async(username, success, fail) => {
    return await api.get(`/accounts/${username}/emotion`)
}