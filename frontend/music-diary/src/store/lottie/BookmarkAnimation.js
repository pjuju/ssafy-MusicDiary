import React, { useEffect} from 'react';
import lottie from 'lottie-web';
import animationData from './bookmark.json';


function BookmarkAnimation() {


    const container = document.querySelector("#container");

    useEffect(()=>{
        lottie.loadAnimation({
            container: container,
            renderer:"svg",
            loop: true,
            autoplay:true,
            animationData: animationData
        })
    }, [])


  return (
    <>
        <div id="container" style={{width:"50px"}}></div>
    </>
  )
}

export default BookmarkAnimation