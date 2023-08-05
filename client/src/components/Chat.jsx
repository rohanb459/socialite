import React, { useContext, useEffect, useState } from "react";
import {UserContext} from './contexts/UserContext'
import Avatar from "./Avatar";
import Logo from "./Logo";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const {username, id} = useContext(UserContext);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  }
  const onlinePeopleExclOurUser = {...onlinePeople};
  delete onlinePeopleExclOurUser[id];
  return (
    <div className="flex h-screen">
      <div className="bg-blue-100 w-1/3">
        <Logo />

        {Object.keys(onlinePeopleExclOurUser).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedUserId(userId)}
            className={
              "border-b border-gray-100  flex items-center gap-2 cursor-pointer " +
              (userId == selectedUserId ? "bg-blue-200" : "")
            }
          >
          {userId === selectedUserId && (<div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>)}
          <div className="flex gap-2 py-2 pl-4 items-center">

            <Avatar username={onlinePeople[userId]} userId={userId} />
            <span className="text-gray-800"> {onlinePeople[userId]}</span>
          </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-300 w-2/3 p-2 flex flex-col">
        <div className="flex-grow">messages with selected person</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message here....."
            className="bg-white flex-grow border p-2 rounded-md"
          />
          <button className="bg-blue-500 p-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
