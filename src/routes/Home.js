import { dbService } from "fbase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState(""); // 글작성 tweet을 가지는 useState 작성
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id, //id값을 할당해주고 그걸 함수에 담아준다.
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; // 'event로 부터' 라는 의미 즉 e안에있는 target 안에있는 value 를 달라고하는es6의 작성법
    setNweet(value);
  };
  // console.log(nweet);
  // console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="코멘트 작성"
          maxLength={120}
        />
        <input type="submit" value="글작성" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}> 
          {/* map으로 배열에 있는 nweet 콜백하여 출력 */}
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
