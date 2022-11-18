import React from "react";

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>삭제</button>
        <button>수정</button>
      </>
    )}
  </div>
);

export default Nweet;
