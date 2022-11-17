import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState(""); // 글작성 tweet을 가지는 useState 작성
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        tweet,
        createdAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setTweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e; // 'event로 부터' 라는 의미 즉 e안에있는 target 안에있는 value 를 달라고하는es6의 작성법
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="코멘트 작성"
          maxLength={100}
        />
        <input type="submit" value="글작성" />
      </form>
    </div>
  );
};
export default Home;
