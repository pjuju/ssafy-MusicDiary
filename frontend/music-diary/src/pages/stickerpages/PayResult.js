import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import MainNote from '../mainpages/MainNote'
import Button from '../../components/Common/Button';
import {Navigate} from "react-router-dom";
import Swal from "sweetalert2";


class PayResult extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.state;
        const {
            // location: { search },
        } = props;
        const code = new URL(window.location.href).searchParams.get("pg_token");

        // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
        params.pg_token = code;
    }

    

    state = {
        params: {
            cid: "TC0ONETIME",
            // localstorage에서 tid값을 읽어온다.
            tid: window.localStorage.getItem("tid"),
            total_amount: window.localStorage.getItem("total_amount"),
            partner_order_id: "partner_order_id",
            partner_user_id: "partner_user_id",
            pg_token: "",
        },
    };

    

    componentDidMount() {
        const { params } = this.state;
        console.log(params)
        console.log(params.total_amount)

        axios({
            url: "https://kapi.kakao.com/v1/payment/approve",
            method: "POST",
            headers: {
                Authorization: "KakaoAK 1f9e18cf1db33d404f4f7cd9b5030e5a",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((response) => {
            // 결제 승인에 대한 응답 출력
            console.log(response);
            
        })
        const pay = qs.stringify({
            charge: params.total_amount,
          });
        const user_id = sessionStorage.getItem("user_id")
        console.log(user_id)
        axios.post(
            `http://j7d204.p.ssafy.io:8080/rest/sticker/kakaopay/${user_id}/`, pay
          )
          .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((err) => {
            console.log(err.data);
        });
}
    

render() {
        const onClickButton = () => {
            return <Navigate to="/" />;
        }


        return (
            <div>
                <div style={{color:'black',position:'absolute',marginLeft:'50vw',marginTop:'30vh',zIndex:'99'}}>
                    <h5>결제가 완료되었습니다.</h5>
                    <h5>{this.state.params.total_amount} 포인트 충전되었습니다.</h5>
                    {/* <Navigate to="/" replace={true} > */}
                        <Button
                    className=" y"
                    name="돌아가기"
                    style={{ width: "110px", fontSize: "22px", marginLeft: "0vw",color:'black',marginTop:'2vh'}}
                    color="#CAD8B5"
                    hcolor="#8FB46E"
                    size="sm"
                    onClick={onClickButton}
                />


                    {/* </Navigate> */}
                </div>
                <MainNote style={{width:'100vw',height:'100vh'}}></MainNote>
            </div>
        );
    }
}
export default PayResult;