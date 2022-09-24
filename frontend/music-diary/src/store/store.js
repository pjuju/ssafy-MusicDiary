import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name: 'user',
    // 평소에 -> 1, 2, 3, 4  / 슬플 때 / 화날 때 / 우울할 때
    initialState: { email:'email', password:'password', password2:'password2', username : 'kim', normalChoice: -1, sadChoice: -1, angryChoice: -1, depressedChoice: -1},

    reducers : {
        // 1. sad 감정 정보 숫자로 받아서 설정하는 부분
        setNormalChoiceValue(state, action){
            console.log("in reducers, Normal: ", action.payload)
            state.normalChoice = action.payload
        },
        setSadChoiceValue(state, action){
            console.log("in reducers, Sad: ", action.payload)
            state.sadChoice = action.payload
        },
        setAngryChoiceValue(state, action){
            console.log("in reducers, Angry: ", action.payload)
            state.angryChoice = action.payload
        },
        setDepressedChoiceValue(state, action){
            console.log("in reducers, Depressed: ", action.payload)
            state.depressedChoice = action.payload
        },
        // 2. userInfo
        setUserEmail(state, action){
            console.log("in reducers, Email:", action.payload)
            state.email = action.payload
        },
        setUserPassword(state, action){
            console.log("in reducers, Password:", action.payload)
            state.password = action.payload
        },
        setUserPassword2(state, action){
            console.log("in reducers, Password 2:", action.payload)
            state.password2 = action.payload
        },
        setUserName(state, action){
            console.log("in reducers, userName:", action.payload)
            state.username = action.payload
        }
    }
})

let test  = createSlice({
    name: 'test',
    initialState: 'test_initial_state'
})


export default configureStore ({
    reducer :{
        user: user.reducer,
        test : test.reducer
    }
})

// 선언한 state 변경함수 export
export let { setNormalChoiceValue, setSadChoiceValue, setAngryChoiceValue, setDepressedChoiceValue, setUserEmail, 
                setUserPassword, setUserPassword2, setUserName}  = user.actions