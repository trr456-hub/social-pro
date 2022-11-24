import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const photoDel = ref(storageService, nweetObj.attachmentUrl);
  // 사진의 url경로를 변수에 담음
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하겠습니까?");
    if (ok) {
      // delete를 가지는 조건문
      // console.log(ok);
      await deleteDoc(NweetTextRef);
      await deleteObject(photoDel);
      // deleteObject 명령어를 사용해 변수에 담은 경로의 사진을 삭제
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    const ok = window.confirm("수정하겠습니까?");
    e.preventDefault();
    if (ok) {
      //console.log(nweetObj, newNweet);
      await updateDoc(NweetTextRef, {
        text: newNweet,
      });
    }
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정할 코멘트를 작성해 주세요."
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
