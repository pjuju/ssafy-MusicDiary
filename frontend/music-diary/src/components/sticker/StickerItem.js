import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StickerItem.css'

const StickerItem = ({sticker}) => {
    const navigate = useNavigate()
    // console.log(sticker.map((it)=> it.thumb_url))
    // console.log(sticker)

    return(<>
    {sticker.map((it)=> (
    <div className="sticker-item" onClick={()=>{navigate(`/sticker/detail/${it.id}`)}}>
        <img src={it.thumb_url} className="sticker-item-img" style={{width:'14vw'}}></img>
        <h5 className='sticker-item-name'>{it.name}</h5>
        <p className='sticker-item-price'>{it.price}원</p>
    </div>
    ))}
    </>)
} 

export default StickerItem