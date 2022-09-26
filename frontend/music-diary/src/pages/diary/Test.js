

import { useState, useContext, useEffect, useRef, createRef, useCallback } from "react";


//  konva 
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";

import { IndividualSticker } from "../sticker-data/individualSticker.tsx";
import { stickersData } from "../sticker-data/stickers.data.ts"

function Test() {
    // konva 
    const [background] = useImage("example-image.jpg");
    const [images, setImages] = useState([]);

    const addStickerToPanel = ({ src, width, x, y }) => {
        setImages((currentImages) => [
          ...currentImages,
          {
            width,
            x,
            y,
            src,
            resetButtonRef: createRef()
          }
        ]);
      };
    
      const resetAllButtons = useCallback(() => {
        images.forEach((image) => {
          if (image.resetButtonRef.current) {
            image.resetButtonRef.current();
          }
        });
      }, [images]);
    
      const handleCanvasClick = useCallback(
        (event) => {
          if (event.target.attrs.id === "backgroundImage") {
            resetAllButtons();
          }
        },
        [resetAllButtons]
      );


  return (
    <>
       <Stage
        width={600}
        height={400}
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
      >
        <Layer>
          <KonvaImage
            image={background}
            height={400}
            width={600}
            id="backgroundImage"
          />
          {images.map((image, i) => {
            return (
              <IndividualSticker
                onDelete={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event) => {
                  image.x = event.target.x();
                  image.y = event.target.y();

                  // console.log("image.x :", image.x)
                  // console.log("image.y:", image.y)
                }}
                key={i}
                image={image}
              />
            );
          })}
        </Layer>
      </Stage>
      <h4 className="heading">Click/Tap to add sticker to photo!</h4>
      {stickersData.map((sticker) => {
        return (
          <button
            className="button"
            onMouseDown={() => {
              addStickerToPanel({
                src: sticker.url,
                width: sticker.width,
                x: 100,
                y: 100
              });
            }}
          >
            <img alt={sticker.alt} src={sticker.url} width={sticker.width} />
          </button>
        );
      })}
    </>
  )
}

export default Test