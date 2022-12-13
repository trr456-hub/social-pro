import React from "react";

const imgWindow = (nweetObj) => {
  return (
    <>
      <div className="imgModal">
        {nweetObj.attachmentUrl && (
          <img alt="imges" src={nweetObj.attachmentUrl} />
        )}
      </div>
    </>
  );
};

export default imgWindow;
