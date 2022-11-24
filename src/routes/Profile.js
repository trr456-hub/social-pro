import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export default (userObj) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); // 로그아웃 된 후 다시 홈으로 돌아갈수있게
  };
  // nweets 얻는 function 생성
  const getMyNweets = async () => {
    // nweets 불러오기
    // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", `${userObj.uid}`),
      orderBy("createdAt", "desc")
    );
    // getDocs 메소드로 쿼리 결과값 가지고 오기
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  // nweets 얻는 function 생성
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  );
};
