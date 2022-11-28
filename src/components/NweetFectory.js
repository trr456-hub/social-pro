import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFectory = ({ userObj }) => {
  //console.log(userObj); //ID값 조회
  const [nweet, setNweet] = useState(""); // 글작성 tweet을 가지는 useState 작성
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    // const attachmentRef = ref(storageService, `${userObj}/${v4()}`); // npm install uuid 설치 : 식별자 랜덤생성
    //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
    //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const attachmentRef = ref(storageService, `${userObj}/${uuidv4()}`); // db 업로드
      //storage 참조 경로로 파일 업로드 하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
    await addDoc(collection(dbService, "nweets"), nweetObj);
    //state 비워서 form 비우기
    setNweet("");
    //파일 미리보기 img src 비워주기
    setAttachment("");
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
  const onClearPhoto = () => setAttachment("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="코멘트를 입력하세요."
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진추가</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            alt="Profileimage"
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearPhoto}>
            <span>삭제</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFectory;
