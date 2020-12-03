import React,{useState, useEffect} from 'react'
import ImgPath1 from "./img/noImage.png";
import { db } from "./firebase";
import "./styles.css";
import ClearIcon from "@material-ui/icons/Clear";
// 表示される順番をuseEffectで制御する。データベースからデータとるときは必須

//削除ボタンの実装
const DeleteInputData = (id) => {
  db.collection("posts").doc(id).delete();
  console.log('削除が実行されました！', id);
};

//データがきますよ＝props
const Post = ({text, image, timestamp, id}) => {
  
    return (
        <div>
          
           
     <div>

            {/* 画像があるときだけ表示 */}
      
            {image ? (
        <div>
          <img src={image} alt="" className="insta"/>
        </div>
      ) : (
        <div>
        <img src={ImgPath1} alt="" className="insta" />
        </div>
      )}
     
            {/* テキスト情報 */}
             <div>{text}</div>  

            {/* 日付を表示！ｊｓの形式 */}
              <div>
                {new Date(timestamp?.toDate()).toLocaleString()}
                <button onClick={() => DeleteInputData(id)}><ClearIcon /></button>
              </div>
         </div>
       </div>
    )
}

export default Post

