import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";

export default function ChatOnline() {

  return (
    <div className="chatOnline">
        <div className="chatOnlineFollower">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src=""
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName"></span>
        </div>
    </div>
  );
}
