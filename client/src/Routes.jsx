import { useContext } from "react";
import RegisterAndLoginForm from "./components/RegisterAndLoginForm";
import { UserContext } from "./components/contexts/UserContext";
import Chat from "./components/Chat";

export default function Routes(){

    const {username, id}= useContext(UserContext);

    if(username)
    {
        return <Chat/>;
    }
    return(
        <RegisterAndLoginForm/>
    )
}