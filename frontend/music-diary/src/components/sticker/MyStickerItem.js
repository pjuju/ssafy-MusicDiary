import { useNavigate } from "react-router-dom";
import "./StickerItem.css";

const MyStickerItem = ({ sticker }) => {
  const navigate = useNavigate();
  return (
    <>
        <div
          className="my-sticker-item"
        >
          <img
            src={sticker.stickerpacks.thumb_url}
            className="my-sticker-item-img"
            style={{ width: "14vw" }}
          ></img>
          <h5 className="my-sticker-item-name">{sticker.stickerpacks.name}</h5>
        </div>

    </>
  );
};

export default MyStickerItem;