import Nweet from "components/Nweet";
import NweetFectory from "components/NweetFectory";
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((document) => { // forEach 로 작성 하면 rerender 해줘야함(새로고침)
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id, //id값을 할당해주고 그걸 함수에 담아준다.
  //     };
  //     //console.log(nweetObject);
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    // firebase v9로 작성 v8로 작성하면 typeerror
    //getNweets();
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        // snapshot 데이터베이스에서 알림을 받는것
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
      //console.log(nweetArr);
    });
  }, []);
  return (
    <div className="container">
      <NweetFectory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
