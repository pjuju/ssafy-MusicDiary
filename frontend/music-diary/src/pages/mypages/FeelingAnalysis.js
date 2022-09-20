import React, {useState} from 'react'
import MainNote from "../mainpages/MainNote";

import { ResponsiveRadar } from '@nivo/radar'
import Form from 'react-bootstrap/Form';

import './FeelingAnalysis.css'

const MyResponsiveRadar = ({ data, callMyName, Color }) => (
    <ResponsiveRadar
        data={data}
        keys={[ callMyName]}
        indexBy="감정"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: Color }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)
const FeelingAnalysis = () => {

    const [tmp, setTmp] = useState('일주일')
    const [color, setColor] = useState('paired')

    let callMyName =(e) => {
        console.log(e.target.value)
        setTmp(e.target.value)
        if (e.target.value === '1개월') {
            setColor('set3')
        }
        if (e.target.value === '6개월') {
            setColor('accent')
        }
        if (e.target.value === '1년') {
            setColor('pastel1')
        }
    }

    const data = [
        {
          "감정": "기뻐요",
          "일주일": 108,
          "1개월": 113,
          "6개월": 62,
          "1년":30
        },
        {
          "감정": "슬퍼요",
          "일주일": 29,
          "1개월": 100,
          "6개월": 43,
          "1년":60
        },
        {
          "감정": "화나요",
          "일주일": 112,
          "1개월": 76,
          "6개월": 46,
          "1년":30
        },
        {
          "감정": "불안해요",
          "일주일": 50,
          "1개월": 34,
          "6개월": 25,
          "1년":3
        },        
        {
            "감정": "평온해요",
            "일주일": 50,
            "1개월": 34,
            "6개월": 25,
            "1년":14
          },
        {
            "감정": "우울해요",
            "일주일": 50,
            "1개월": 34,
            "6개월": 25,
            "1년":10
        }
      ]
    return (<div className="feeling-analysis">
        <div className="analysis">
            <div className="analysis-graph">
                <h2 className="analysis-page-title">나의 감정 분석</h2>
                <Form.Select aria-label="Default select example" onChange={callMyName}
                className="analysis-time-form">
                    <option value="일주일">일주일</option>
                    <option value="1개월">1개월</option>
                    <option value="6개월" >6개월</option>
                    <option value="1년">1년</option>
                </Form.Select>
                <MyResponsiveRadar data={data} callMyName={tmp} Color={color}/>
            </div>
            <div className="feeling-music-type">
                <h2 className="analysis-page-title">나의 기분에 따른 음악 취향</h2>
                <div className="music-research">
                    <h4>평소에 어떤 음악을 들으시나요?</h4>
                    <Form.Select aria-label="Default select example">
                        <option>감정을 선택하세요</option>
                        <option value="1">행복한 노래</option>
                        <option value="2">슬픈 노래</option>
                        <option value="3">잔잔한 노래</option>
                        <option value="4">신나는 노래</option>
                    </Form.Select>
                </div>
                <div className="music-research">
                    <h4>슬플 때 어떤 음악을 들으시나요?</h4>
                    <Form.Select aria-label="Default select example">
                        <option>감정을 선택하세요</option>
                        <option value="1">행복한 노래</option>
                        <option value="2">슬픈 노래</option>
                        <option value="3">잔잔한 노래</option>
                        <option value="4">신나는 노래</option>
                    </Form.Select>
                </div>
                <div className="music-research">
                    <h4>화날 때 어떤 음악을 들으시나요?</h4>
                    <Form.Select aria-label="Default select example">
                        <option>감정을 선택하세요</option>
                        <option value="1">행복한 노래</option>
                        <option value="2">슬픈 노래</option>
                        <option value="3">잔잔한 노래</option>
                        <option value="4">신나는 노래</option>
                    </Form.Select>
                </div>
                <div className="music-research">
                    <h4>우울할 때 어떤 음악을 들으시나요?</h4>
                    <Form.Select aria-label="Default select example">
                        <option>감정을 선택하세요</option>
                        <option value="1">행복한 노래</option>
                        <option value="2">슬픈 노래</option>
                        <option value="3">잔잔한 노래</option>
                        <option value="4">신나는 노래</option>
                    </Form.Select>
                </div>
                <ul class="snip1226">
                    <li><a href="#" data-hover="저장하기">저장하기</a></li>
                </ul>
            </div>
        </div>
        <MainNote className="main-note"></MainNote>
    </div>)
}

export default FeelingAnalysis;