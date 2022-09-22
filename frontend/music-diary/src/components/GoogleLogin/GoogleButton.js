// // import React, {useCallback, useEffect} from 'react';
// // import {GoogleLogin,GoogleLogout} from 'react-google-login';
// // import { gapi } from 'gapi-script';

// // const clientId = '6220350812-e25rqf97d4eq86bi6lkn763f257jtgeb.apps.googleusercontent.com'

// // const GoogleButton = ({onSocial}) => {
// //     useEffect(()=> {
// //         function start() {
// //             gapi.client.init({
// //                 clientId,
// //                 scope:'email',
// //             })
// //         }
// //         gapi.load('client:auth2',start)
// //     },[])

// //     const onSuccess=(response)=> {
// //         console.log(response)
// //     }

// //     const onFailure=(response)=> {
// //         console.log(response)
// //     }

// //     return (
// //         <div>
// //             <GoogleLogin
// //                 clientId={clientId}
// //                 buttonText="구글아이디로 로그인 제발"
// //                 onSuccess={onSuccess}
// //                 onFailure={onFailure}
// //             ></GoogleLogin>

// //         </div>
// //     )
// // }

// // export default GoogleButton;

// import React, { useEffect,useCallback } from 'react'
// import { GoogleLogin, GoogleLogout } from 'react-google-login'
// import { post } from 'utils/sdk';
// const GoogleButton = () => {
//     const clientId = '6220350812-e25rqf97d4eq86bi6lkn763f257jtgeb.apps.googleusercontent.com'

//   // 로그인 성공했을 때 처리 함수
//   const onGoogleLoginSuccess = useCallback(
//     response => {
//       const idToken = response.tokenId;
//       const data = {
//         email: response.profileObj.email,
//         first_name: response.profileObj.givenName,
//         last_name: response.profileObj.familyName
//       };
  
//       validateTokenAndObtainSession({ data, idToken })
//         .then(handleUserInit)
//         .catch(notifyError);
//     },
//     [handleUserInit]
//   );

//   //로그인 실패했을 때 처리 함수
//   const onGoogleLoginFailure = (response) => {
//     console.log(response);
//   }

//   // 로그아웃 성공했을 때 처리 함수
//   const onLogoutSuccess = () => {
//     console.log('SUCCESS LOG OUT');
//   };

//   const validateTokenAndObtainSession = ({ data, idToken }) => {
//     const headers = {
//       Authorization: idToken,
//       'Content-Type': 'application/json'
//     };
  
//     return post('users/init/', data, { headers });
//   };

//   return (
//     <React.Fragment>
//       <GoogleLogin
//         clientId={clientId}
//         buttonText="Sign in with Google"
//         onSuccess={onGoogleLoginSuccess}
//         onFailure={onGoogleLoginFailure}
//       />
//       <GoogleLogout
//         clientId={clientId}
//         onLogoutSuccess={onLogoutSuccess}
//       />
//     </React.Fragment>
//   )
// }

// export default GoogleButton