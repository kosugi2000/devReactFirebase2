import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
import "./styles.css";


const Feed = () => {
  //firebaseに作成した項目を受け取るための変数＝useState（状態）
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);

  //useEffectの処理

  useEffect(() => {
    const firebaseData = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);
  console.log(posts);

  return (
    <div>
        {/* TweetInput読み込み */}
        <TweetInput/>
      {/* 記述3. Postコンポーネントを表示するロジックを書きます */}
      <div id="a">
      {posts && (
        <>
          {posts.map((postItem) => (
            <Post
              key={postItem.id}
              image={postItem.image}
              text={postItem.text}
              timestamp={postItem.timestamp}
              id={postItem.id}
            />
          ))}
        </>
      )}
      </div>
    </div>
  );
};

export default Feed;
