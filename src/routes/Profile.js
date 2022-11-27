import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); // 로그아웃 된 후 다시 홈으로 돌아갈수있게
    refreshUser();
  };
  // nweets 얻는 function 생성
  // const getMyNweets = async () => {
  //   // nweets 불러오기
  //   // dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
  //   const q = query(
  //     collection(dbService, "nweets"),
  //     where("creatorId", "==", `${userObj.uid}`),
  //     orderBy("createdAt")
  //   );
  //   // getDocs 메소드로 쿼리 결과값 가지고 오기
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data());
  //   });
  // };
  // // nweets 얻는 function 생성
  // useEffect(() => {
  //   getMyNweets();
  // }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="이름"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="정보수정"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
    </div>
  );
};

export default Profile;
