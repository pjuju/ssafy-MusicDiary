//       {/* 저장됐었던 sticker 배치 */}
//       <div>
//         {originStickers.map((ele, i) => {
//           return (
//             <>
//               <img
//                 alt="#"
//                 src={ele.sticker.image_url}
//                 style={{
//                   position: "absolute",
//                   width: "100px",
//                   top: "`{ele.sticker.sticker_x}`px",
//                   left: "`{ele.sticker.sticker_x}`px",
//                 }}
//               />
//             </>
//           );
//         })}
//       </div>
// //
//   /////////////////////////

//         {/* 저장됐었던 sticker 배치 */}
//         <div>
//         <Stage
//             className="stage-area"
//             width={700}
//             height={400}
//             onClick={handleCanvasClick}
//             onTap={handleCanvasClick}
//             id="backgroundImage"
//           >
//             <Layer>
//               {originStickers.map((ele, i) => {
//                 return (
//                   <IndividualSticker
//                     className="individual-sticker"
//                     onDelete={() => {
//                       const newStickers = [...originStickers];
//                       newStickers.splice(i, 1);
//                       setOriginStickers(newStickers);
//                     }}
//                     onDragEnd={(event) => {
//                       ele.sticker_x = event.target.x();
//                       ele.sticker_y = event.target.y();
//                       console.log("stage안의 스티커 선택");
//                       console.log("image.x :", ele.sticker_x);
//                       console.log("image.y:", ele.sticker_y);
//                       console.log("image의id: ", ele.sticker_id);
//                     }}
//                     key={i}
//                     image={ele}
//                   />
//                 );
//               })}
//             </Layer>
//           </Stage>
  