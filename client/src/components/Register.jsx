import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

  async function register(e) {
    e.preventDefault();
    const {data}=await axios.post("/register", { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form action="" className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          className="block w-full rounded-md p-2 mb-2 border"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          className="block w-full rounded-md p-2 mb-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white block w-full rounded-md p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
