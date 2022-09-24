import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name: 'user',
    // 평소에 -> 1, 2, 3, 4  / 슬플 때 / 화날 때 / 우울할 때
    initialState: {name : 'kim', normalChoice: -1, sadChoice: -1, angryChoice: -1, depressedChoice: -1},
    // 1. sad 감정 정보 숫자로 받아서 설정하는 부분
    reducers : {
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
export let { setNormalChoiceValue, setSadChoiceValue, setAngryChoiceValue, setDepressedChoiceValue}  = user.actions