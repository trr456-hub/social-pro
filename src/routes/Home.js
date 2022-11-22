import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString } from "firebase/storage";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  //console.log(userObj); //ID값 조회
  const [nweet, setNweet] = useState(""); // 글작성 tweet을 가지는 useState 작성
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
  const onSubmit = async (event) => {
    event.preventDefault();
    // const fileRef = ref(storageService, `${userObj}/${v4()}`); // npm install uuid 설치 : 식별자 랜덤생성
    const fileRef = ref(storageService, `${userObj}/${uuidv4()}`); // db 업로드
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);
    // await addDoc(collection(dbService, "nweets"), {
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; // 'event로 부터' 라는 의미 즉 e안에있는 target 안에있는 value 를 달라고하는es6의 작성법
    setNweet(value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    //console.log(theFile);
    const reader = new FileReader(); // fileReader API 사용
    reader.onloadend = (fEvent) => {
      // 파일의 로딩이 끝나고 아래의 readAsDataURL 실행
      // console.log(fEvent.currentTarget.result);
      const {
        currentTarget: { result },
      } = fEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // theFile의 URL읽어오기
  };
  // console.log(nweet);
  // console.log(nweets);
  const onClearPhoto = () => {
    setAttachment(null);
  };
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="글작성" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhoto}>업로드취소</button>
          </div>
        )}
      </form>
      <div>
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
