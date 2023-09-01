import axios from "axios";
import {UserContextProvider } from "./components/contexts/UserContext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = 'https://socialite-server-chi.vercel.app';
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
     <Routes/>
    </UserContextProvider>
  )
}

export default App
