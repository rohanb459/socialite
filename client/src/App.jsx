import Register from "./components/Register"
import axios from "axios";
import { UserContextProvider } from "./components/contexts/UserContext";

function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
     <Register/>
    </UserContextProvider>
  )
}

export default App
